<?php

namespace App\Http\Controllers\Schedule;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedules;
use App\Models\User;
// use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'id_owner' => 'required',
            'name' => 'required',
            'date' => 'required|date',
            'weight' => 'required',
        ]);
        $owner = Auth::user();
        // dd($owner->id);
        $data = $request->all();
        $data['id_owner'] = $owner->id;
        $date = new \DateTime($data['date']);
        $data['date'] = $date->format('Y-m-d');
        $data['status'] = 'Waiting';
        // Xử lý định dạng giờ sử dụng Carbon
        // $timezone = 'Asia/Ho_Chi_Minh';
        // $data['time_start'] = Carbon::createFromFormat('H:i', $data['time_start'], $timezone)->format('H:i:s');
        // $data['time_end'] = Carbon::createFromFormat('H:i', $data['time_end'], $timezone)->format('H:i:s');

        $schedule = Schedules::create($data);
        return response()->json([
            'message' => 'Schedule created successfully',
            'schedule' => $schedule
        ], 200);
    }
    public function delete($id)
    {
        $owner = Auth::user();
        $schedule = Schedules::where("id", $id)->where("id_owner", $owner->id)->first();
        if ($schedule) {
            $schedule->delete();

            return response()->json([
                'message' => 'Successfully delete a schedule',
            ], 200);
        }
        return response()->json([
            'error' => "The schedule field is not correct",
        ], 400);
    }
    
    public function getDataById($id)
    {
        $owner = Auth::user();
        // dd($owner->id);
        $schedule = Schedules::where("id", $id)->where("id_owner", $owner->id)->first();
        if ($schedule) {
            return response()->json([
                'schedule' => $schedule
            ]);
        }
        return response()->json([
            'error' => "The Schedule field is not correct",
        ], 400);
    }
    public function update(Request $request, $id)
    {
        // name trong schedule để mỗi khi tạo meal, ex sẽ lưu name giống nhau:
        // vd: nameschedule1   id_meal:1  id_ex:null   describe:abc   status: (true, false, pending) 
        // vd: nameschedule1   id_meal:null  id_ex:1   describe:abc   status: (true, false, pending) 
        $user = Auth::user();
        $data = $request->all();
        $schedule = Schedules::find($id);

        if (!$schedule) {
            return response()->json(['error' => 'Schedule not found '], 404);
        }
        $schedule->status = $data['status'];
        $schedule->describe = $data['describe'];
        $schedule->update();

        return response()->json(['message' => 'Schedule updated successfully', 'schedule' => $schedule]);
    }
    public function getScheduleInDate(Request $request)
    {
        $auth = Auth::user();
        // dd($auth);
        if($auth->role_id == 2){
            $request->validate([
                'date' => 'required|date',
                'id_user' =>'required'
            ]);
            $dateRequest = new \DateTime($request->date); 
            $date = $dateRequest->format('Y-m-d');
            
            $schedules = Schedules::where('date', $date)
                          ->where('id_owner', $auth->id)
                          ->where('id_user', $request->id_user)
                          ->get();
            // dd($schedules);
            return response()->json(['schedules' => $schedules]);
        }else if($auth->role_id == 1){
            $request->validate([
                'date' => 'required|date',
                'id_coach' =>'required'
            ]);
            $dateRequest = new \DateTime($request->date); 
            $date = $dateRequest->format('Y-m-d');
            
            $schedules = Schedules::where('date', $date)
                          ->where('id_user', $auth->id)
                          ->where('id_owner',$request->id_coach)
                          ->get();
            // dd($schedules);

            return response()->json(['schedules' => $schedules]);
        }else{
            return response()->json(['message' => 'fail']);
        }
        
    }
    // public function getSheduleDetail($id){
    //     $schedule = Schedules::find($id);
    //     return response()->json(['message' => 'Get schedule detail updated successfully', 'schedule' => $schedule]);
    // }
    // public function getScheduleInMonth(Request $request)
    // {
        
    //     $request->validate([
    //         'year' => 'required|integer',
    //         'month' => 'required|integer|between:1,12',
    //     ]);

    //     $year = $request->input('year');
    //     $month = $request->input('month');

    //     // Tạo một đối tượng Carbon từ năm và tháng
    //     $startDate = Carbon::create($year, $month, 1)->startOfMonth();
    //     $endDate = Carbon::create($year, $month, 1)->endOfMonth();

    //     // Lấy danh sách các lịch trình trong tháng
    //     $schedules = Schedules::whereBetween('date', [$startDate, $endDate])->get();

    //     return response()->json(['schedules' => $schedules]);
    // }
}