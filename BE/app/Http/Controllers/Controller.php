<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function loadModel(Request $request)
    {
        try {
            // Lấy dữ liệu JSON từ yêu cầu
            $data = $request->json()->all();

            // Gửi yêu cầu POST đến API Python
            $client = new Client(['base_uri' => 'http://127.0.0.1:5000/']);
            $response = $client->request('POST', 'predict', [
                'json' => $data,
            ]);

            // Lấy dữ liệu JSON từ kết quả trả về
            $responseData = json_decode($response->getBody(), true);

            // Trả về kết quả
            return response()->json($responseData);
        } catch (\Exception $e) {
            // Trả về lỗi nếu có lỗi xảy ra
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
