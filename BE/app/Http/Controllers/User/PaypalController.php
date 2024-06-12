<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\intermediate;
use App\Models\Invoice;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Illuminate\Support\Facades\Auth;
class PaypalController extends Controller
{
    public function processPaypal(Request $request)
    {
        $user = Auth::user();
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('success', ['user_id' => $user->id, 'price' => $request->price]),
                "cancel_url" => route('cancel'),
            ],
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => round($request->price/23000, 2)
                    ]
                ]
            ]
        ]);
        $redirect = env('APP_CLIENT_URL') . "/payment-failed";
        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    return response()->json([
                        'status' => true,
                        'link' => $links['href'],
                    ],200);
                }
            }
            return redirect($redirect);
        } else {
            return redirect($redirect);
        }
    }

    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        $response = $provider->capturePaymentOrder($request['token']);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            $user = User::where("id", $request->user_id)->first();
            $intermediate = intermediate::where("id_user", $user->id)->where("id_payment", 0)->first();

            if ($intermediate && $user) {
                $invoice = Invoice::create([
                    'id_invoice'       => "INV" . mt_rand(1000000000, 9999999999),
                    'total_money'      => $request->price,
                    'user_id'          => $user->id,
                    'full_name'        => $user->full_name,
                    'phone'            => $user->phone,
                ]);
                $intermediate->id_payment = $invoice->id;
                $intermediate->save();
                $data["link"] =  env('APP_URL') . "/history";
                // SendMailJob::dispatch($user->email, 'Thank you for booking our soccer field. This is your order confirmation message.', $data, 'mail.mail_payment');
                // $redirect = env('APP_CLIENT_URL') . "/payment-success";
                $redirect = "http://localhost:3000?status=success";
                return redirect($redirect);
            }
        }
        $redirect = env('APP_CLIENT_URL') . "/payment-failed";
        return redirect($redirect);
    }

    public function cancel()
    {
        $redirect = env('APP_CLIENT_URL') . "/payment-failed";

        return redirect($redirect);
    }
}
