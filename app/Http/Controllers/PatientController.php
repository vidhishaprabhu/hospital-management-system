<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Patient::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'            => 'required|string|max:100',
            'date_of_birth'   => 'required|date',
            'gender'          => 'required|string',
            'address'         => 'required|string',
            'phone_number'    => 'required|string|max:10',
            'admission_date'  => 'required|date',
            'discharge_date'  => 'required|date',
        ]);

        $data['admission_date'] = Carbon::parse($data['admission_date'])->toDateString();
        $data['discharge_date'] = Carbon::parse($data['discharge_date'])->toDateString();
        $data['date_of_birth'] = Carbon::parse($data['date_of_birth'])->toDateString();

        $patient = Patient::create($data);
        return response()->json(['message' => 'Patient created successfully', 'data' => $patient], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json((['message' => 'Patient not found']), 404);
        }
        return response()->json($patient);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json((['message' => 'Patient not found']), 404);
        }
        $patient->update($request->all());
        return response()->json((['message' => 'Patient updated successfully', 'data' => $patient]));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $patient = Patient::find($id);
        if (!$patient) {
            return response()->json((['message' => 'Patient not found']), 404);
        }
        $patient->delete();
        return response()->json((['message' => 'Patient deleted successfully']));
    }
}
