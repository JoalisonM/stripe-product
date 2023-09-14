from flask_restful import Api
from flask import Flask, Blueprint
from helpers.cors import cors
# from helpers.database import db
from resources.product import Products, Product, ProductCheckout

# create the app
app = Flask(__name__)

# restful
api_bp = Blueprint('api', __name__)
api = Api(api_bp, prefix="/api")

# initialize the app with the extension
# db.init_app(app)
cors.init_app(app)


api.add_resource(Product, '/products/<id>')
api.add_resource(Products, '/products')
api.add_resource(ProductCheckout, '/products/checkout/<priceId>')
# Blueprints para Restful
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)