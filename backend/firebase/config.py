import firebase_admin
from firebase_admin import credentials, firestore
import os

db = None  # Holds the Firestore client

def initialize_firebase():
    global db
    if not firebase_admin._apps:
        cred = credentials.Certificate("firebase_acc.json")
        firebase_admin.initialize_app(cred)
    db = firestore.client()
