# api path to find tee times given user specified date, time, and geolocation
from fastapi import APIRouter, HTTPException, status
import requests

router = APIRouter()

@router.get("/tee-times")
def get_teetimes(date: str, time: str, lat: float, lon: float, proximity: int = 25):
    # Validate inputs
    if not date or not time:
        raise HTTPException(status_code=400, detail="Date and time are required")
    if not lat or not lon:
        raise HTTPException(status_code=400, detail="Error in finding location")
    
    # Call external API to get tee times (this is a PLACEHOLDER URL)
    url = f"https://api.example.com/tee-times?date={date}&time={time}&lat={lat}&lon={lon}&proximity={proximity}"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Unable to fetch tee times")
    
    return response.json()
