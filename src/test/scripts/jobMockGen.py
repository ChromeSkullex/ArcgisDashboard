from faker import Faker
import random
import moment
import json

# Initialize Faker
fake = Faker()

# Define the possible values for job types, priorities, and progress statuses
job_types = ["inspection", "repair", "installation"]
priorities = ["high", "medium", "low"]
progress_statuses = ["not started", "completed", "in progress", "review"]

def generateUser(i) :
    first_name = fake.first_name()
    last_name = fake.last_name()
    username = first_name[0]+"."+last_name
    return ({
        "id": i,
        "firstName": first_name, 
        "lastName": last_name,
        "username": username,
        "email": username+"@company.com",
        "role": "field_assessor"
    })

def generateFieldAssessors():
    field_assessors_mock = []
    for i in range(1, 5):
        field_assessors_mock.append(generateUser(i))
    return field_assessors_mock

def random_time():
    hour = random.randint(9, 16)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return f"{hour:02}:{minute:02}:{second:02}"

# Define a list of field assessors
field_assessors = generateFieldAssessors()

# Generate 20 random job mocks
job_mocks = []
for i in range(20):
    is_completed = random.choices([True, False], weights=[0.2, 0.8], k=1)[0]
    progress = "completed" if is_completed else random.choice(["not started", "in progress", "review"])
    
    assigned_date = moment.now().add(days=random.randint(-30, 0)).format("YYYY-MM-DD")
    assigned_time = random_time()
    completion_date = moment.now().add(days=random.randint(0, 30)).format("YYYY-MM-DD") if is_completed else None
    completion_time = random_time() if is_completed else None
    
    job = {
        "id": i,
        "assignee": random.choice(field_assessors),
        "job_type": random.choice(job_types),
        "priority": random.choice(priorities),
        "date_assigned": f"{assigned_date}T{assigned_time}",
        "progress": progress,
        "is_completed": is_completed,
        "completion_date": f"{completion_date}T{completion_time}" if completion_date else None
    }
    job_mocks.append(job)

with open('../mocks/jobMocks.json', 'w') as file:
    json.dump(job_mocks, file, indent=4)