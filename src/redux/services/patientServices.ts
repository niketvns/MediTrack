import {createAsyncThunk} from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// get all patients
export const getPatients = createAsyncThunk(
    'patients/get',
    async (_) => {
        try {
            let res: Response = await fetch(`${API_BASE_URL}/patients`);
            let data = await res.json();
            return data.patients;
        } catch(error) {
            console.log('Error Generated: ');
            console.log(error);
            // return error;
        }
    }
)

// get a patient details
export const getPatientDetails = createAsyncThunk(
    'patientDetails/get',
    async (patientId: string | undefined) => {
        try {
            let res: Response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
            let data = await res.json();
            return data.foundPatient;
        } catch(error) {
            console.log(error);
        }
    }
)

// add a new patient
export const addNewPatient = createAsyncThunk(
    'addPatient/post',
    async (patientDetails: Partial<Patient>) => {
        try {
            let res: Response = await fetch(`${API_BASE_URL}/patients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patientDetails)
            });
            let data = await res.json();
            if(data.status !== "ok") {
                throw new Error();
            }
            return data.addedPatient;
        } catch(error) {
            console.log(error);
        }
    }
)

// delete a patient
export const deletePatient = createAsyncThunk(
    'deletePatient/delete',
    async (patientId: string | undefined) => {
        try {
            let res: Response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await res.json();
            return data.deletedPatient;
        } catch(error) {
            console.log(error);
        }
    }
)

// edit a patient details
export const editPatientDetails = createAsyncThunk(
    'editPatientDetails/put',
    async (patientDetails: Partial<Patient>) => {
        try {
            let res: Response = await fetch(`${API_BASE_URL}/patients/${patientDetails._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: patientDetails.name, age: patientDetails.age, gender: patientDetails.gender, contact: patientDetails.contact})
            });
            let data = await res.json();
            return data.editedDetails;
        } catch(error) {
            console.log(error);
        }
    }
)