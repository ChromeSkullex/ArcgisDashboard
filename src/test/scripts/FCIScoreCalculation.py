import pandas as pd
import json

yearByJson = {}

def convertToNum(workbook):
    fci_num = []
    for index, row in workbook.iterrows():
        if pd.notna(row["Facility Condition Index (FCI)"]):
            year_json = pd.to_datetime(row["DateCompleted"]).year
            num = float(row["Facility Condition Index (FCI)"].strip('%'))
            fci_num.append(num)
            
            if year_json in yearByJson:
                yearByJson[year_json].append(num)
            else:
                yearByJson[year_json] = [num]
    
    return fci_num

def yearJson(yearByJson):
    result = {}
    for year, values in yearByJson.items():
        mean_value = sum(values) / len(values)
        result[year] = {
            "list": values,
            "mean": mean_value
        }
    return result

# Load the workbook
workbook = pd.read_excel("iAuditorData.xlsx")
fci_num = convertToNum(workbook)

# Calculate the mean FCI
mean_fci = sum(fci_num) / len(fci_num)
print("Mean FCI:", mean_fci)

# Calculate the mean per year and create the new JSON structure
yearly_mean_json = yearJson(yearByJson)

# Save the new JSON structure to a file
with open('../mocks/yearByJson.json', 'w') as file:
    json.dump(yearly_mean_json, file, indent=4)

# Print the new JSON structure for verification
print(json.dumps(yearly_mean_json, indent=4))
