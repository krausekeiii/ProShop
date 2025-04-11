from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from services.auth_service import AuthService
from models.auth_models import SignUpRequest, SignInRequest
import requests
import os

router = APIRouter()

FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")
FIREBASE_AUTH_URL = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"

# --------- Routes ---------
@router.post("/signup")
def sign_up(req: SignUpRequest):
    try:
        user = AuthService.sign_up(req.email, req.password, req.display_name)
        return {"message": "User created successfully", "user": user}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))


@router.post("/signin")
def sign_in(req: SignInRequest):
    payload = {
        "email": req.email,
        "password": req.password,
        "returnSecureToken": True
    }
    response = requests.post(FIREBASE_AUTH_URL, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    data = response.json()
    return {
        "idToken": data["idToken"],            # Use for auth on client
        "refreshToken": data["refreshToken"],  # Can be used to re-auth
        "expiresIn": data["expiresIn"]
    }

