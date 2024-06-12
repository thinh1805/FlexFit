<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\intermediate;
use App\Models\User;
use App\Models\Customer;
use App\Models\Coach;
use App\Models\Invoice;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function getDataCustomer() {
        // $check = auth::check();
        // $users = user::all();
        $customer = User::join("Customer", "users.id", "Customer.id_user")
                    ->select("users.id", "users.email", "users.role_id", 
                            "Customer.name", "Customer.DOB", "Customer.phone", "Customer.sex", "Customer.image")
                    ->orderBy("users.id", "ASC")
                    ->get();
        // $coach = User::join("Coach", "users.id", "Coach.id_user")
        //             ->select("users.id", "users.email", "users.role_id", 
        //                     "Coach.name", "Coach.DOB", "Coach.phone", "Coach.sex")
        //             ->orderBy("users.id", "ASC")
        //             ->get();
        
        // $users = $customer->merge($coach);
        // dd($users);
        return response()->json([
            'customer'  => $customer,
        ], 200);
        // dd($users);
    
    }  
    public function getDataCoach() {
        // $check = auth::check();
        // $users = user::all();
        $coach = User::join("coach", "users.id", "coach.id_user")
                    ->select("users.id", "users.email", "users.role_id", 
                            "coach.name", "coach.DOB", "coach.phone", "coach.sex", "coach.image", "coach.degree")
                    ->orderBy("users.id", "ASC")
                    ->get();
        // $coach = User::join("Coach", "users.id", "Coach.id_user")
        //             ->select("users.id", "users.email", "users.role_id", 
        //                     "Coach.name", "Coach.DOB", "Coach.phone", "Coach.sex")
        //             ->orderBy("users.id", "ASC")
        //             ->get();
        
        // $users = $customer->merge($coach);
        // dd($users);
        return response()->json([
            'coach'  => $coach,
        ], 200);
        // dd($users);
    } 
    public function destroy($id)
    {
        $user = User::where("id", $id)->first();
        $customer = Customer::where("id_user", $id)->first();
        $coach = Coach::where("id_user", $id)->first();
        if ($customer) {
            $user->delete();
            $customer->delete();
            return response()->json([
                'message'  => "Delete customer successfully",
            ], 200);
        }

        if ($coach) {
            $user->delete();
            $coach->delete();
            return response()->json([
                'message'  => "Delete coach successfully",
            ], 200);
        }

        return response()->json([
            'error'  => 'An error has occurred',
        ], 400);
    }
    public function searchCoachByName(Request $request)
    {
        $name = $request->input('name');

        // Kiểm tra nếu không có tên được cung cấp
        if (!$name) {
            return response()->json(['error' => 'Name not provided'], 400);
        }

        // Tìm kiếm các bài tập với tên chứa $name
        $coachs = User::join('coach', 'users.id', 'coach.id_user')
                ->where('coach.name', 'like', "%$name%")
                ->select('coach.*', 'users.email')
                ->get();

        return response()->json($coachs);
    }
    public function searchCustomerByName(Request $request)
    {
        $name = $request->input('name');
        //Kiểm tra nếu không có tên được cung cấp
        if (!$name) {
            return response()->json(['error' => 'Name not provided'], 400);
        }

        //Tìm kiếm các bài tập với tên chứa $name
        $customers = User::join('customer', 'users.id', 'customer.id_user')
                ->where('customer.name', 'like', "%$name%")
                ->select('customer.*', 'users.email')
                ->get();

        return response()->json($customers);
    }
    public function getListInvoices() {
        $invoices = intermediate::join('invoices', 'intermediate.id_payment', 'invoices.id')
        ->join('customer', 'intermediate.id_user', 'customer.id_user')
        ->select('intermediate.id', 'customer.name', 'customer.phone', 'customer.sex', 'customer.id_user', 
                'invoices.id_invoice', 'invoices.total_money','invoices.created_at','invoices.updated_at')->get();
        if($invoices != "[]") {
            return response()->json([
                'invoices' => $invoices
            ]);
        }
        return response()->json([
            'messages' => "No data to display"
        ]);
    }
}
