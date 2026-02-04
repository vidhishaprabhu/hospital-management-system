<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $data=$request->validate([
            'name'=>'required|string',
            'email'=>'required|string|unique:users,email',
            'password'=>'required|min:6'
        ]);
        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=>$token

        ]);
    }
    public function login(Request $request){
        $request->validate([
            'email'=>'required',
            'password'=>'required'
        ]);

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['message'=>'Invalid Credentials'],401);
        }

        $user=Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'token'=>$token,
            'user'=>$user
        ]);

    }
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'User logged out successfully']);
    }
}
