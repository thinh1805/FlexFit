<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Admin;
use App\Models\Customer;
use App\Models\Coach;
use App\Models\Degree;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;
use Hash;

class AuthController extends Controller
{
    
    public function login(Request $request){
    	
         // Lấy thông tin đăng nhập từ yêu cầu
         $credentials = $request->only('email', 'password');

        // Check email existence (assuming you have a User model)
        if (!User::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        // Check password using Laravel's Hash facade
        if (!Hash::check($request->password, User::where('email', $request->email)->first()->password)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        // Attempt login using Laravel's Auth facade
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        // Generate JWT token on successful login (assuming JWT middleware)
        $token = JWTAuth::fromUser(Auth::user());

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => Auth::user() // Include user details if needed
        ]);
    }
    public function register(Request $request) {
        $existingUser = User::where('email', $request->email)->first();

        if ($existingUser) {
            return response()->json(['error' => 'Email already exists'], 400);
        }
        else {
            $user = User::create([
                'role_id' => 1,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);
            if ($user) {
                // Tạo một bản ghi Customer nếu role_id là 1 (Customer)
                // if ($user->role_id == 1) {
                    Customer::create([
                        'id_user' => $user->id,
                        // Bạn có thể thêm các trường dữ liệu khác ở đây nếu cần
                    ]);
                // }
        
                // Tương tự, bạn có thể thêm các trường hợp khác cho các vai trò khác ở đây
        
                return response()->json(['message' => 'User registered successfully', 'user' => $user]);
            }
        }
        return response()->json(['error' => 'Registration failed'], 500);
    }
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully logout']);
    }
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    public function userProfile() {
        return response()->json([auth()->user()]);
    }
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
    public function changePassWord(Request $request) {
        // $validator = Validator::make($request->all(), [
        //     'old_password' => 'required|string|min:6',
        //     'new_password' => 'required|string|min:6',
        // ]);

        // if($validator->fails()){
        //     return response()->json($validator->errors()->toJson(), 400);
        // }
        // $userId = auth()->user()->id;

        // $user = User::where('id', $userId)->update(
        //             ['password' => bcrypt($request->new_password)]
        //         );

        // return response()->json([
        //     'message' => 'User successfully changed password',
        //     'user' => $user,
        // ], 201);
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        $user = auth()->user();
        
        // Check if the provided old password matches the current password
        if (!Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'message' => 'The old password is incorrect.'
            ], 400);
        }
        
        // Update the password
        $user->password = bcrypt($request->new_password);
        $user->save();
        
        return response()->json([
            'message' => 'User successfully changed password',
            'user' => $user,
        ], 201);
    }
    
    public function getDataUser() {
        $user = Auth::user();
        // dd($user->id);
        if ($user->role_id == 1) {
            // dd($user->role_id);
            // Lấy thông tin của coach nếu role_id là 1 
            $customer = User::join('customer', 'users.id', '=', 'customer.id_user')
                        ->leftjoin('degree', 'users.id', '=' , 'degree.id_customer')
                        ->select('customer.*', 'users.email','degree.status')
                        ->where('users.id', $user->id) // Lọc theo ID người dùng đã đăng nhập
                        ->first();
                        return response()->json([
                            'customer' => $customer,
                        ], 200);
        } else if($user->role_id==2) {
            // Lấy thông tin của customer nếu role_id không phải là 1
            $coach = User::join('coach', 'users.id', 'coach.id_user')
                ->select('coach.*', 'users.email')
                ->where('users.id', $user->id)
                ->first();
                return response()->json([
                    'coach' => $coach,
                ], 200);
        }

    }

    public function Update(Request $request){
       
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        
        $user = Auth::user();
        // dd($user->id);
        if ($user->role_id == 1) {
            
            // Kiểm tra và cập nhật thông tin cho model Customer
            $customer = Customer::where('id_user', $user->id)->first();
            // dd($customer);
            if ($customer) {
                // $customer =update($request->all());
                $customer->update($request->except('image'));
                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    $imageName = $image->getClientOriginalName();
                    $image->move(public_path('customerImages'), $imageName);
                    $customer->image = '/customerImages/' . $imageName;
                    $customer->save();
                }
            }
        
            return response()->json([
                'status'    => 1,
                'message'   => 'User profile changed successfully',
                'user'      => $user,
                'customer'  => $customer
            ]);
        } elseif ($user->role_id == 2) {
        
            // Kiểm tra và cập nhật thông tin cho model Coach
            $coach = Coach::where('id_user', $user->id)->first();
            // dd($coach);
            if ($coach) {
                // $coach->update($request->all());
                $coach->update($request->except('image'));
                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    $imageName = $image->getClientOriginalName();
                    $image->move(public_path('coachImages'), $imageName);
                    $coach->image = '/coachImages/' . $imageName;
                    $coach->save();
                }
            }
        
            return response()->json([
                'status'    => 1,
                'message'   => 'Coach profile changed successfully',
                'user'      => $user,
                'coach'     => $coach
            ]);
        } else {
            return response()->json([
                'status'    => 0,
                'message'   => 'User profile change Error',
            ]);
        }
    }
    
    
    
}