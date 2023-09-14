from flask_restful import fields

product_fields = {
  'id': fields.String,
  'name': fields.String,
  'price': fields.String,
  'imageUrl': fields.String,
  'description': fields.String,
}