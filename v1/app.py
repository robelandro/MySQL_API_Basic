#!/usr/bin/env python3
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://tumbler:@localhost/tumbler_test'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.String(120), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(120), nullable=False)
    username = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'


@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        user_list = []
        for user in users:
            user_dict = {
                'id': user.id,
                'name': user.name,
                'username': user.username,
                'email': user.email,
                'city': user.city,
                'phone': user.phone
            }
            user_list.append(user_dict)
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()
        print(data)
        user = User(
            name=data['name'],
            username=data['username'],
            email=data['email'],
            city=data['city'],
            phone=data['phone']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User added successfully.'}), 201
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/delete_user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/update_user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()
        if user:
            data = request.get_json()
            user.name = data.get('name', user.name)
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.city = data.get('city', user.city)
            user.phone = data.get('phone', user.phone)
            db.session.commit()
            return jsonify({'message': 'User updated successfully.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
