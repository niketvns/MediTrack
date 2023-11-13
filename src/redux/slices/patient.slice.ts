import {createSlice} from "@reduxjs/toolkit";
import {getPatients, getPatientDetails, addNewPatient, editPatientDetails, deletePatient} from "../services/patientServices";

const initialState: InitialState = {
    allPatients: [],
    loading: false,
    error: null,
    patientDetails: null
}

export const PatientSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // fetch patients
            .addCase(getPatients.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.allPatients = action.payload;
            })
            .addCase(getPatients.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
            })
            // fetch indivisual patients
            .addCase(getPatientDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPatientDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.patientDetails = action.payload;
            })
            .addCase(getPatientDetails.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
            })
            // add new patient
            .addCase(addNewPatient.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNewPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.allPatients = [...<[]>state.allPatients, action.payload];
            })
            .addCase(addNewPatient.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
                state.error = 'Error Occured to add a new patient';
            })
            // edit patient Details
            .addCase(editPatientDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(editPatientDetails.fulfilled, (state, action) => {
                const updatedPatient = action.payload
                state.loading = false;
                state.error = null
                state.allPatients = state.allPatients?.map(patient => patient._id === updatedPatient._id ? updatedPatient : patient)
                state.patientDetails = updatedPatient;
            })
            .addCase(editPatientDetails.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
                state.error = 'Error Occured to edit a patient details';
            })
            // delete patient
            .addCase(deletePatient.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.allPatients = state.allPatients?.filter(patient => patient._id !== action.payload._id);
            })
            .addCase(deletePatient.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
                state.error = 'Error Occured to delete a patient';
            })
    }
})

export default PatientSlice.reducer;