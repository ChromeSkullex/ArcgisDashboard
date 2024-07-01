import pandas as pd
import json

# Initialize the dictionary outside the function
jsonDateCalculation = {}

def dateConvertion(workbook):
    for index, row in workbook.iterrows():
        if index != 0:
            date_started = pd.to_datetime(row["DateStarted"])
            conducted_on = pd.to_datetime(row["ConductedOn"])
            date_completed = pd.to_datetime(row["DateCompleted"])

            conduction_response = round((conducted_on - date_started).total_seconds() / 3600, 2)
            completion_response = round((date_completed - conducted_on).total_seconds() / 3600, 2)
            jsonDateCalculation[index-1] = {
                "PSC_Number": row["PSC_Number"],
                "dateStarted": date_started,
                "conductedIn": conducted_on,
                "dateCompleted": date_completed,
                "responseTime": {
                    "conductionResponse": conduction_response,
                    "completionResponse": completion_response
                }
            }

# Load the workbook
workbook = pd.read_excel("iAuditorData.xlsx")
# Convert dates and populate the dictionary
dateConvertion(workbook)

# Save to a JSON file
with open("../mocks/performanceTime.json", "w") as json_file:
    json.dump(jsonDateCalculation, json_file, indent=4, default=str)  # default=str to handle datetime conversion
