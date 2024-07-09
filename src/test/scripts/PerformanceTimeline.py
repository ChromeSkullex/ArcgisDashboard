import pandas as pd
import json

# Initialize the dictionary outside the function
jsonDateCalculation = {}

def dateConvertion(workbook):
    # Convert date columns to datetime
    workbook["DateStarted"] = pd.to_datetime(workbook["DateStarted"])
    workbook["ConductedOn"] = pd.to_datetime(workbook["ConductedOn"])
    workbook["DateCompleted"] = pd.to_datetime(workbook["DateCompleted"])

    # Group by dateStarted and calculate mean for each group
    grouped_workbook = workbook.groupby("DateStarted").agg({
        "PSC_Number": "mean",
        "ConductedOn": "mean",
        "DateCompleted": "mean"
    }).reset_index()

    for index, row in grouped_workbook.iterrows():
        date_started = row["DateStarted"]
        conducted_on = row["ConductedOn"]
        date_completed = row["DateCompleted"]

        conduction_response = round((conducted_on - date_started).total_seconds() / 3600, 2)
        completion_response = round((date_completed - conducted_on).total_seconds() / 3600, 2)
        jsonDateCalculation[index] = {
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
