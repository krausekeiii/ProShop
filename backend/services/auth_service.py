from firebase_admin import auth
from firebase.config import db
from firebase_admin.auth import EmailAlreadyExistsError, UserNotFoundError

class AuthService:
    @staticmethod
    def sign_up(email: str, password: str, display_name: str = ""):
        try:
            user = auth.create_user(
                email=email,
                password=password,
                display_name=display_name,
            )
            return {"uid": user.uid, "email": user.email}
        except EmailAlreadyExistsError:
            raise ValueError("Email is already registered.")

    @staticmethod
    def get_user_by_email(email: str):
        try:
            return auth.get_user_by_email(email)
        except UserNotFoundError:
            return None
