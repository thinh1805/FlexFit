<?php

namespace App\Services;

use Predis\Client;

class KerasModelService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'host' => config('redis.default.host'),
            'port' => config('redis.default.port'),
            'password' => config('redis.default.password'),
        ]);
    }

    public function loadModel($modelName)
    {
        // Tải mô hình từ kho lưu trữ (điều chỉnh dựa trên phương thức lưu trữ của bạn)
        if (config('app.env') === 'local') {
            // Ví dụ cho phát triển cục bộ (thay thế bằng đường dẫn thực tế của bạn)
            $modelPath = storage_path('app/models/' . $modelName . '.h5');
            if (!file_exists($modelPath)) {
                throw new \Exception("Tệp mô hình '$modelPath' không tìm thấy.");
            }
            return \unserialize(file_get_contents($modelPath));
        } else {
            // Ví dụ cho lưu trữ Redis (thay thế bằng tên khóa của bạn)
            $modelData = $this->client->get('keras:' . $modelName);
            if (!$modelData) {
                throw new \Exception("Mô hình '$modelName' không tìm thấy trong Redis.");
            }
            return \unserialize($modelData);
        }
    }
}