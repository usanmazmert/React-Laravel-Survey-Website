<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function(){
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::apiResource("survey", SurveyController::class); // This method creates all routes for all request types and functions like (GET, POST, DELETE...)
    Route::get("/me", [AuthController::class, "me"]);

    Route::get('/dashboard', [DashboardController::class, 'index']);
}); //This method is going to ensure that the user had authenticated to make this request calls.

Route::post("/signup", [AuthController::class, "signup"]);

Route::post("/login", [AuthController::class, "login"]);

Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);

Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);