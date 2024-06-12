import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import pickle

df = pd.read_csv('BodyFat_-_Extended.csv')
df['Sex'] = df['Sex'].map({'M': 1, 'F':0})


X = df.drop('BodyFat', axis = 1)
y = df['BodyFat']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = LinearRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f'Mean Squared Error: {mse:.2f}')
print(f'Mean Absolute Error: {mae:.2f}')
print(f'R-squared: {r2:.2f}')

pickle.dump(model, open('linear_reg.sav', 'wb'))

def convert_sex(sex):
    return 1 if sex.lower() == 'm' else 0

# Function to get user input and make predictions.
def predict_body_fat(model, input_data):

    input_data['Sex'] = convert_sex(input_data['Sex'])

    # Converting input data to a DataFrame.
    input_df = pd.DataFrame([input_data])

    # Predicting the Body Fat value based on the user input.
    prediction = model.predict(input_df)

    return prediction[0]

# Asking user to input their measurment details.
sex = input("Sex (M/F): ")
age = float(input("Age: "))
weight = float(input("Weight: "))
height = float(input("Height: "))
neck = float(input("Neck circumference: "))
chest = float(input("Chest circumference: "))
abdomen = float(input("Abdomen circumference: "))
hip = float(input("Hip circumference: "))
thigh = float(input("Thigh circumference: "))
knee = float(input("Knee circumference: "))
ankle = float(input("Ankle circumference: "))
bicep = float(input("Bicep circumference: "))
forearm = float(input("Forearm circumference: "))
wrist = float(input("Wrist circumference: "))


# Creating the structure for the user input.
user_input = {
    'Sex': sex,  # Assuming 0 for male, 1 for female
    'Age': age,
    'Weight': weight,
    'Height': height,
    'Neck': neck,
    'Chest': chest,
    'Abdomen': abdomen,
    'Hip': hip,
    'Thigh': thigh,
    'Knee': knee,
    'Ankle': ankle,
    'Biceps': bicep,
    'Forearm': forearm,
    'Wrist': wrist
}

# Calling the function on the user input.
user_prediction = predict_body_fat(grid_search, user_input)

print(f'\n\nBased on the information provided, your predicted Body Fat Percentage evaluates to: {user_prediction:.2f}%')