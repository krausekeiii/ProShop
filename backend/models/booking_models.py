from pydantic import BaseModel, Field

# store user id with tee time id
class Bookings(BaseModel):
    user_id: str = Field(..., description="Primary key")
    tee_time_id: str
    method: str  # cart or walking

# store tee time id with golf course id, date, and time
class TeeTime(BaseModel):
    tee_time_id: str = Field(..., description="Primary key")
    course_id: str
    date: str
    time: str

# store course id with course name, amenities, rating, slope, and location
class Course(BaseModel):
    course_id: str = Field(..., description="Primary key")
    name: str
    amenities: list[str]
    rating: float
    slope: int
    lat: float
    lon: float