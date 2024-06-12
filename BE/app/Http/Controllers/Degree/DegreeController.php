<?php

namespace App\Http\Controllers\Degree;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use App\Models\Degree;
use Illuminate\Support\Facades\Auth;
use App\Models\Coach;
use App\Models\User;
use App\Models\Customer;
// use App\Models\Degree;
use Illuminate\Support\Facades\DB;
class DegreeController extends Controller
{
    public function index()
    {
        $degrees = DB::table('degree')
            ->join('customer', 'degree.id_customer', '=', 'customer.id')
            ->join('users', 'customer.id_user', '=', 'users.id')
            ->select('degree.id as degree_id', 'degree.degree_image', 'degree.status', 'customer.id as customer_id', 'customer.name', 'customer.DOB', 'customer.phone', 'customer.sex', 'customer.image', 'users.id as user_id', 'users.role_id', 'users.email')
            ->get();
        return response()->json($degrees);
    }
    public function storeTemporaryDegree(Request $request)
    {
    $validator = Validator::make($request->all(), [
        'degree_image' => 'required|file|mimes:jpeg,png,jpg|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Invalid input.',
            'errors' => $validator->errors()->toArray(),
        ], 400);
    }
    if (!Auth::check()) {
        return response()->json([
            'message' => 'Unauthorized',
        ], 401);
    }

    $user = Auth::user();
    $customerId = $user->id; // Assuming user is linked to customer
    // dd($customerId);
    // Update degree information
    $degree = Degree::where('id_customer', $customerId)->first();
    if (!$degree) {
        $degree = new Degree();
        $degree->id_customer = $customerId;
    }
    $degree->update($request->except('degree_image'));
    $degree->status = 'Waiting';
    if ($request->hasFile('degree_image')) {
        $degreeImage = $request->file('degree_image');
        $imageName = $degreeImage->getClientOriginalName(); // Tên gốc của hình ảnh
        $degreeImage->move(public_path('degreeImage'), $imageName); // Di chuyển hình ảnh vào thư mục public/images

        // Cập nhật đường dẫn hình ảnh trong cơ sở dữ liệu
        $degree->degree_image  = '/degreeImage/' . $imageName;
        $degree->save();
    }
    
    return response()->json([
        'message' => 'Degree and profile updated successfully.',
        'user' => $user,
        'degree' => $degree,
    ]);
    // sau khi thực hiện xong thì id_user có đổi không
    }
    public function acceptDegree(Request $request)
    {
        // Đổi status của Degree thành 'active'
        $degree = Degree::find($request->id_degree);
        //  dd($degree);
        $degree->status = 'Processed';
        $degree->save();
        // Đổi id của User thành 2
        $user = User::find($request->id_user);
        // dd($user);
        $user->role_id = 2;
        $user->save();

        $customer = Customer::find($request->id_user);
        // dd($customer);
        // Thêm dữ liệu từ bảng User vào bảng Coach
        $coach = new Coach;
        $coach->id_user = $request->id_user;
        $coach->name = $customer->name; // hoặc các trường khác mà bạn muốn chuyển
        $coach->DOB = $customer->DOB;
        $coach->phone = $customer->phone;
        $coach->sex = $customer->sex;
        $coach->address = $customer->address;
        $coach->id_payment = null;
        $coach->id_schedule = null;
        $coach->degree = $degree->degree_image;
        $coach->role_id = 2;
        
        if ($customer->image) {
            // Đường dẫn của hình ảnh trong bảng Customer
            $CustomerImagePath = public_path($customer->image);
            // Kiểm tra xem hình ảnh có tồn tại không
            if (file_exists($CustomerImagePath)) {
                // Tạo tên mới cho hình ảnh trong bảng Coach
                $newImageName = 'coach_' . time() . '.' . pathinfo($CustomerImagePath, PATHINFO_EXTENSION);
        
                // Di chuyển và lưu hình ảnh vào thư mục của bảng Coach
                $newImagePath = public_path('coachImages/' . $newImageName);
                copy($CustomerImagePath, $newImagePath);
        
                // Gán đường dẫn mới vào trường image của bảng Coach
                $coach->image = '/coachImages/' . $newImageName;
            }
        }
        // Sao chép các trường khác cần thiết từ bảng User sang bảng Coach
        $coach->save();

        // Xóa dữ liệu từ bảng Customer tương ứng với id_user
        Customer::where('id_user', $request->id_user)->delete();

        return response()->json(['message' => 'Thành công'], 200);
    }
    public function cancelDegree(Request $request)
    {
        $degree = Degree::find($request->id_degree);
        //  dd($degree);
        $degree->status = 'Cancel';
        $degree->save();
        return response()->json(['message' => 'Thành công'], 200);
    }
    //từ chối sẽ không thay đổi role_id và vẫn giữ nguyên giữ liệu

}
