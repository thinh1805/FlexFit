<?php

namespace App\Http\Controllers\Coach;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\intermediate;
use App\Models\Meals;
use App\Models\Customer;
use App\Models\Coach;
use App\Models\User;
use App\Models\Type_Meal;

class CoachController extends Controller
{
    public function getListMeal() {
        $coach = auth()->user();

        $list = Type_Meal::join("Meals", "Meals.id_type_meal", "Type_Meal.id")
                    ->select("Meals.name", "Meals.carb", "Meals.fiber", "Meals.protein", "Meals.Calo_kcal", "Type_Meal.nameType")
                    ->orderBy("Meals.id", "ASC")
                    ->get();
        // $list = [];
        return response()->json([
            'data' => $list,
        ], 200);
    }    


    public function getRequest() {
        $coach = auth()->user();
        $getIdCoach = Coach::where("id_user", auth()->id())->select("id")->first();
        $getCustomer = intermediate::join("Customer", "Customer.id_user", "=", "intermediate.id_user")
        ->select("intermediate.id", "intermediate.id_coach", "intermediate.accept", "Customer.id_user", "Customer.name", "Customer.DOB", "Customer.phone", "Customer.sex")
        // ->where("accept", 0)->where("id_coach", $getIdCoach->id)->where('id_payment', '!=', 0)
        ->where("accept", 0)->where("id_coach", $getIdCoach->id)
        ->orderBy("intermediate.id", "ASC")
        ->get();

        return response()->json([
            'data' => $getCustomer,
        ]);
    }

    public function receiveRequest(Request $request, $id) {
        $coach = auth()->user();
        if(!$request->data) {
            intermediate::where("id", $id)->delete();
            return response()->json([
                'Message' => "Declined the request",
            ], 400);
        }
        else {
            // $getIdCoach = Coach::select("id")->where("id_user", $coach->id)->first();
            intermediate::where("id", $id)->update(["accept" => 1]);
            return response()->json([
                'Message' => "Accepted the request",
            ], 200);
        }
    } 

    public function getBody() {
        $user = auth()->user();
        // $customer = Customer::select('id', 'name', 'DOB', 'phone', 'sex')->where('id', $id)->get();
        $getIdCoach = Coach::where("id_user", auth()->id())->select("id")->first();
        $getCustomer = intermediate::join("Customer", "Customer.id_user", "=", "intermediate.id_user")
        ->join('users', 'Customer.id_user', '=', 'users.id')
        ->select("intermediate.id", "intermediate.id_coach", "intermediate.accept", "Customer.id_user", "Customer.name", "Customer.DOB", "Customer.phone", "Customer.sex","Customer.image","users.email")
        ->where("id_coach", $getIdCoach->id)->where("accept", 1)
        ->orderBy("intermediate.id", "ASC")
        ->get();
        if(!$getCustomer->isEmpty()) {
            return response()->json([
                'data' => $getCustomer,
            ], 200);
        }
        return response()->json([
            'messages' => "No data to display",
        ], 200);
    }
    public function getBodyById($id){
        $user = auth()->user();
        $customer = Customer::join('history', "history.id_user", "=", "customer.id_user")
        ->select("customer.name", "customer.DOB", "customer.phone", "customer.sex", "customer.image",
                "history.age", "history.weight", "history.height", "history.neck", "history.chest",
                "history.abdomen", "history.hip", "history.thigh", "history.knee", "history.ankle",
                "history.biceps", "history.forearm", "history.wrist", "history.bodyfat")
        ->where("history.id_user", $id)
        ->orderBy("history.created_at", "desc")
        ->take(1)
        ->get();
        return response()->json(['customer'=>$customer]);
    }
}
