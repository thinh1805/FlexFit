<?php

// use App\Http\Controllers\Admin\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Meals\MealsController;
use App\Http\Controllers\Meals\TypeMealsController;
use App\Http\Controllers\Exercises\TypeExercisesController;
use App\Http\Controllers\Exercises\ExercisesController;
use App\Http\Controllers\Degree\DegreeController;
use App\Http\Controllers\Schedule\ScheduleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/loadModel', [\App\Http\Controllers\Controller::class, 'loadModel']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/change-pass', [AuthController::class, 'changePassWord']); 
    Route::get('/get-data-user', [AuthController::class, 'getDataUser']);
    Route::post('/update-profile', [AuthController::class, 'Update']); 
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Get list Coach for User
    Route::get('/getCoach', [\App\Http\Controllers\User\UserController::class, 'getCoach']); 

    // Get list Coach by Id
    Route::get('/getCoachById/{id}', [\App\Http\Controllers\User\UserController::class, 'getCoachById']); 
    
    // Send Request to Coach
    Route::get('/getCoachById/{id}/sendRequest', [\App\Http\Controllers\User\UserController::class, 'sendRequest']); 
    
    // Receive Request to User
    Route::get('/getRequest', [\App\Http\Controllers\Coach\CoachController::class, 'getRequest']); 
    // Choose option request to User
    Route::post('/receiveRequest/{id}', [\App\Http\Controllers\Coach\CoachController::class, 'receiveRequest']); 

    // Rate and Comment with id_coach
    Route::post('/evaluate/{id}', [\App\Http\Controllers\User\UserController::class, 'evaluate']); 


    Route::get('/getListMeal', [\App\Http\Controllers\Coach\CoachController::class, 'getListMeal']); 

    Route::post('/saveBody', [\App\Http\Controllers\User\UserController::class, 'saveBody']); 
    
    Route::get('/getHistory/{id}', [\App\Http\Controllers\User\UserController::class, 'getHistory']); 

    Route::get('/getBody', [\App\Http\Controllers\Coach\CoachController::class, 'getBody']); //done

    Route::get('/getBodyById/{id}', [\App\Http\Controllers\Coach\CoachController::class, 'getBodyById']);
    
    Route::get('/getBodyCustomer', [\App\Http\Controllers\User\UserController::class, 'getBodyCustomer']);

    Route::get('/getMyCoach', [\App\Http\Controllers\User\UserController::class, 'getMyCoach']);

    
    Route::post('/schedule/create',[ScheduleController::class, 'create']);
    Route::get('/schedule/delete/{id}',[ScheduleController::class, 'delete']);
    // Route::get('/schedule/get-data',[ScheduleController::class, 'getDataById']);
    Route::post('/schedule/{id}', [ScheduleController::class, 'update']);
    Route::get('/schedules/date', [ScheduleController::class, 'getScheduleInDate']);

    //invoices
    Route::get('/getInvoices', [\App\Http\Controllers\User\UserController::class, 'getInvoices']); 
});
Route::get('/getListInvoices', [\App\Http\Controllers\Admin\AdminController::class, 'getListInvoices']); 
Route::get('/getDataCustomer', [\App\Http\Controllers\Admin\AdminController::class, 'getDataCustomer']);
Route::get('/getDataCoach', [\App\Http\Controllers\Admin\AdminController::class, 'getDataCoach']);
Route::post('/destroy/{id}', [\App\Http\Controllers\Admin\AdminController::class, 'destroy']);
Route::get('/coach/search' , [\App\Http\Controllers\Admin\AdminController::class, 'searchCoachByName']);
Route::get('/customer/search' , [\App\Http\Controllers\Admin\AdminController::class, 'searchCustomerByName']);
//Meals
Route::get('/meals/index', [MealsController::class, 'index']);
Route::post('/meals/create', [MealsController::class, 'create']);
Route::get('/meals/search' , [MealsController::class, 'searchByName']);
Route::get('/meals/delete/{id}', [MealsController::class, 'delete']);

//Type Meals
Route::get('/type_meal/index', [TypeMealsController::class, 'index']);
Route::post('/type_meal/create', [TypeMealsController::class, 'create']);
//Type Exercises
Route::get('/type_exercises/index', [TypeExercisesController::class, 'index']);
Route::post('/type_exercises/create', [TypeExercisesController::class, 'create']);

//Exercises
Route::get('/exercises/index', [ExercisesController::class, 'index']);
Route::post('/exercises/create', [ExercisesController::class, 'create']);
Route::get('/exercises/search' , [ExercisesController::class, 'searchByName']);
Route::get('/exercises/delete/{id}', [ExercisesController::class, 'delete']);

//Degree
Route::get('/degree/index', [DegreeController::class, 'index']);
Route::post('/degree/create', [DegreeController::class, 'storeTemporaryDegree']);
Route::post('/acceptDegree',[DegreeController::class, 'acceptDegree']);
Route::post('/cancelDegree',[DegreeController::class, 'cancelDegree']);

//Payment
Route::post('/process-paypal', [\App\Http\Controllers\User\PayPalController::class, 'processPaypal'])->name('processPaypal');
Route::get('/process-success', [\App\Http\Controllers\User\PayPalController::class, 'success'])->name('success');
Route::get('/process-cancel', [\App\Http\Controllers\User\PayPalController::class, 'cancel'])->name('cancel');

// Route::get('/schedules/month', [ScheduleController::class, 'getScheduleInMonth']);
// Route::get('/schedule/{id}',[ScheduleController::class, 'getSheduleDetail']);
// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'

// ], function ($router) {
    
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::post('/refresh', [AuthController::class, 'refresh']);
//     Route::get('/user-profile', [AuthController::class, 'userProfile']);
//     Route::post('/change-pass', [AuthController::class, 'changePassWord']); 
//          
// });
// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'

// ], function ($router) {
//     Route::post('/index', [MealsController::class, 'index']);
//     Route::post('/create', [MealsController::class, 'create']);  
// });
