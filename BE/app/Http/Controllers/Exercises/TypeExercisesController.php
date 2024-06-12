<?php

namespace App\Http\Controllers\Exercises;
use App\Http\Controllers\Controller;


use Illuminate\Http\Request;
use App\Models\Type_Ex;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;


class TypeExercisesController extends Controller
{
    public function index()
    {
        $type_ex = Type_Ex::all();

        return response()->json($type_ex);
    }
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $type_ex = Type_Ex::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Loại bài tập đã được thêm thành công',
            'data' => $type_ex,
        ], 201);
    }
}
