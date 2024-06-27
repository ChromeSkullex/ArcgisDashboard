import pandas as pd
import random
import arrow
import json

facilities_assessors = ["Micheal Bitz", "Josh Faby", "Jason Johnson", "Kenneth Johnson", "Daniel McBEE", "Soulihe Nida", "Mark Stevens"]

users = []

def generate_users():
    for index, assessor in enumerate(facilities_assessors):
        first_name, last_name = assessor.split()
        
        username = first_name[0].lower() + '.' + last_name.lower()
        
        role = "lead_facilities_assessor" if assessor == "Kenneth Johnson" else "facilities_assessor"
        
        users.append({
            "id": index,
            "firstName": first_name, 
            "lastName": last_name,
            "username": username,
            "email": username + "@company.com",
            "role": role
        })

generate_users()

workbook = pd.read_excel("iAuditorData.xlsx")

json_audit = []

for index, row in workbook.iterrows():
    if pd.notna(row["PSC_Number"]):  
        is_completed = True
        
        compare_date = arrow.get('2024-04-10', 'YYYY-MM-DD')
        date_completed = arrow.get(str(row["DateCompleted"]))
        
        if date_completed > compare_date:
            is_completed = random.choices([True, False], weights=[0.2, 0.8], k=1)[0]

        prim_user = random.choice(users)
        prep_user = row["PreparedBy"]
        psc_num = row["PSC_Number"]
        title = row["SurveyTitle"].split("/")[0]
        date_start = arrow.get(str(row["DateStarted"]), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss')
        date_complete = date_completed if is_completed else ''
        status = random.choice(["not started", "in progress", "review"]) if not is_completed else "complete"

        json_audit.append({
            "id": 0,
            "assignee": prim_user,
            "prep_user": prep_user,
            "psc_num": psc_num,
            "title": title,
            "status": status,
            "date_start": f"{date_start}",
            "date_complete": f"{date_complete}"
        })


with open('../mocks/jobMocks.json', 'w') as file:
    json.dump(json_audit, file, indent=4)



