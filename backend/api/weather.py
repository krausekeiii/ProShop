# api routes to get weather forecast for given location and date
from fastapi import APIRouter, HTTPException, status

import requests

router = APIRouter()

@router.get("/weather")
def get_weather(lat: float, lon: float, date: str):
    # Validate inputs
    if not lat or not lon:
        raise HTTPException(status_code=400, detail="Error in finding location")
    if not date:
        raise HTTPException(status_code=400, detail="Date is required")

    days = []
    # get weather for next 5 days
    for i in range(date, date + 4):
        # Call external API to get weather forecast (this is a PLACEHOLDER URL)
        url = f"https://api.example.com/weather?lat={lat}&lon={lon}&date={i}"
        response = requests.get(f"date={date}&lat={lat}&lon={lon}")
        days.append(response.json())
    
    
    for response in days:
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Unable to fetch weather data")

    return days.json()