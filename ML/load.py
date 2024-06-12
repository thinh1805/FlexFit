# from flask import Flask, request, jsonify
# import pandas as pd
# import numpy as np
# import pickle
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load mô hình từ tệp .sav
# with open("bayesian_ridge_regression.sav", 'rb') as file:
#     model = pickle.load(file)

# def convert_sex(sex):
#     return 1 if sex.lower() == 'm' else 0
    
        
# # def convert_sex(sex):
# #     return "M" if sex.lower() == 'm' else "F"

# @app.route('/api/loadModel', methods=['POST'])
# def predict():
#     try:
#         # Nhận dữ liệu từ yêu cầu POST
#         # data = request.form.to_dict()
#         # if 'Sex' not in data or data['Sex'].lower() not in ['m', 'f']:
#         #     return jsonify({'error': "Missing or invalid 'Sex' field"}), 400
#         data = request.get_json(force=True)  # Sử dụng get_json với force=True
        
#         # Chuyển đổi giới tính thành số
#         data['Sex'] = convert_sex(data['Sex'])

#         # Tạo DataFrame từ dữ liệu nhận được
#         input_data = pd.DataFrame([data])

#         # Dự đoán
#         prediction = model.predict(input_data)

#         # Trả về kết quả dự đoán cùng với các thông tin Sex, Age, Height, và Weight
#         result = {
#             'Body Fat': prediction[0],
#             'Sex': data['Sex'],
#             'Age': data['Age'],
#             'Height': data['Height'],
#             'Weight': data['Weight'],
#             'Neck': data['Neck'],
#             'Chest': data['Chest'],
#             'Abdomen': data['Abdomen'],
#             'Hip': data['Hip'],
#             'Thigh': data['Thigh'],
#             'Knee': data['Knee'],
#             'Ankle': data['Ankle'],
#             'Biceps': data['Biceps'],
#             'Forearm': data['Forearm'],
#             'Wrist': data['Wrist']
#         }

#         return jsonify(result)

#     except Exception as e:
#         # Trả về lỗi nếu có lỗi xảy ra
#         return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model from .sav file
with open("bayesian_ridge_regression.sav", 'rb') as file:
    model = pickle.load(file)

def convert_sex(sex):
    return 1 if sex.lower() == 'm' else 0
    
@app.route('/api/loadModel', methods=['POST'])
def predict():
    try:
        # Ensure request is JSON
        if not request.is_json:
            return jsonify({'error': 'Request must be in JSON format'}), 400

        # Get JSON data from request
        data = request.get_json()

        # Check if all required fields are present
        required_fields = ['Sex', 'Age',  'Weight', 'Height' , 'Neck', 'Chest', 'Abdomen', 'Hip', 'Thigh', 'Knee', 'Ankle', 'Biceps', 'Forearm', 'Wrist']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
            
        # Convert sex to numeric
        data['Sex'] = convert_sex(data['Sex'])

        # Create DataFrame
        input_data = pd.DataFrame([data])

        # Make prediction
        prediction = model.predict(input_data)

        # Prepare response
        result = {
            'Body_Fat': prediction[0],
            'Sex': data['Sex'],
            'Age': data['Age'],
            'Height': data['Height'],
            'Weight': data['Weight'],
            'Neck': data['Neck'],
            'Chest': data['Chest'],
            'Abdomen': data['Abdomen'],
            'Hip': data['Hip'],
            'Thigh': data['Thigh'],
            'Knee': data['Knee'],
            'Ankle': data['Ankle'],
            'Biceps': data['Biceps'],
            'Forearm': data['Forearm'],
            'Wrist': data['Wrist']
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)