import os
import stripe
from dotenv import load_dotenv
from flask_restful import Resource
from model.product import *

load_dotenv()

class Products(Resource):
  def get(self):
    stripeKey = os.getenv("STRIPE_SECRET_KEY")

    stripe.api_key = stripeKey

    products = stripe.Product.list(expand=["data.default_price"])

    productsResponse = []

    for product in products:
      price = product.default_price
      productsResponse.append({
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'imageUrl': product.images[0],
        'price': price.unit_amount/100,
      })

    return productsResponse

class Product(Resource):
  def get(self, id):
    stripeKey = os.getenv("STRIPE_SECRET_KEY")

    stripe.api_key = stripeKey

    product = stripe.Product.retrieve(id, expand=["default_price"])

    price = product.default_price

    productsResponse ={
      'id': product.id,
      'name': product.name,
      'description': product.description,
      'imageUrl': product.images[0],
      'price': price.unit_amount/100,
      'defaultPriceId': price.id,
    }

    return productsResponse

class ProductCheckout(Resource):
  def post(self, priceId):
    stripeKey = os.getenv("STRIPE_SECRET_KEY")

    stripe.api_key = stripeKey

    checkoutSession = stripe.checkout.Session.create(
      success_url="http://127.0.0.1:5173/sucess",
      cancel_url="http://127.0.0.1:5173",
      mode="payment",
      line_items=[
        {
          'price': priceId,
          'quantity': 1,
        }
      ]
    )

    return {
      'checkoutUrl': checkoutSession.url,
    }

