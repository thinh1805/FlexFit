<?php

namespace App\Http\Controllers\Meals;

use Illuminate\Http\Request;
use App\Models\Type_Meal;
use App\Http\Controllers\Controller;

class TypeMealsController extends Controller
{
    public function index()
    {
        $type_meals = Type_Meal::all();

        return response()->json($type_meals);
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'nameType' => 'required|string|max:255',
        ]);

        $type_meal = Type_Meal::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Loại thức ăn đã được thêm thành công',
            'data' => $type_meal,
        ], 201);
    }

}
