from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Firebase setup
from firebase.config import initialize_firebase

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# API routers
from api.auth import router as auth_router
#from api.tee_times import router as tee_times_router
#from api.weather import router as weather_router
#from api.courses import router as courses_router
#from api.calendar import router as calendar_router

# Initialize Firebase
initialize_firebase()

# Create FastAPI app
app = FastAPI(
    title="ProShop API",
    description="Backend for the ProShop App",
    version="1.0.0",
)

# CORS setup (adjust as needed for frontend origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # <-- CHANGE TO <frontend domain>
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
#app.include_router(tee_times_router, prefix="/tee-times", tags=["Tee Times"])
#app.include_router(weather_router, prefix="/weather", tags=["Weather"])
#app.include_router(courses_router, prefix="/courses", tags=["Courses"])
#app.include_router(calendar_router, prefix="/calendar", tags=["Calendar"])

# Local dev run
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
