<?php

namespace App\Http\Controllers\Exercises;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Type_Ex;
use App\Models\Exercises;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ExercisesController extends Controller
{
    public function index()
    {
        $exercises = Exercises::all();

        return response()->json($exercises);
    }
    public function create(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'set' => 'required|string|max:255',
            'rep' => 'required|string|max:255',
            'time_minutes' => 'required|string|max:255',
            'calo_kcal' => 'required|string|max:255',
            'url' => 'nullable|url|max:255',
            'id_type_ex' => 'nullable|integer'
        ];
        $request->validate($rules);
        $data= $request->all();
        if($data){
            Exercises::create($data);
            return response()->json([
                'success' => true,
                'message' => 'bài tập đã được thêm thành công',
                'data' => $data,
            ], 200);
        }
        return response()->json(['error' => 'create failed'], 400);
    }
    public function searchByName(Request $request)
    {
        $name = $request->input('name');
        
        // Kiểm tra nếu không có tên được cung cấp
        if (!$name) {
            return response()->json(['error' => 'Name not provided'], 400);
        }

        // Tìm kiếm các bài tập với tên chứa $name
        $exercises = Exercises::where('name', 'like', "%$name%")->get();

        return response()->json($exercises);
    }
    public function delete($id)
    {
        $exercise = Exercises::find($id);
        
        if (!$exercise) {
            return response()->json([
                'error' => "Exercise do not exist",
            ], 404);
        }
        
        $exercise->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Delete exercise successfully',
        ], 200);
    }

    public function importExercise(Request $request)
    {
        try {
            // Kiểm tra xem có tệp được tải lên không
            if (!$request->hasFile('excel_file')) {
                return response()->json(['error' => 'Không có tệp được tải lên.'], 400);
            }

            $file = $request->file('excel_file');

            // Kiểm tra định dạng của tệp (xls hoặc xlsx)
            $extension = strtolower($file->getClientOriginalExtension());
            if (!in_array($extension, ['xls', 'xlsx'])) {
                return response()->json(['error' => 'Định dạng tệp không hợp lệ. Vui lòng tải lên tệp Excel.'], 400);
            }

            $spreadsheet = IOFactory::load($file);

            $data = $spreadsheet->getActiveSheet()->toArray();
            foreach ($data as $row) {
                $exer = Exercises::create([
                    'name' => $row[0] ?? null,
                    'set' => $row[1] ?? null,
                    'rep' => $row[2] ?? null,
                    'time_minutes' => $row[3] ?? null,
                    'calo_kcal' => $row[4] ?? null,
                    'id_type_ex' => $row[5] ?? null,
                    // Thêm các trường khác tương ứng với cấu trúc Excel của bạn
                ]);
            }
            // dd($data);
            return response()->json([
                'message' => 'Dữ liệu đã được nhập thành công!',
                // 'data' => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Dữ liệu đã được nhập thành công!',
            ], 500);
        }
    }
}
