import {createSlice} from "@reduxjs/toolkit";
import {addNewWard, deleteWard, editWardDetails, getWardDetails, getWards} from "../services/wardServices";
import type {PayloadAction} from '@reduxjs/toolkit'

const initialState: InitialState = {
    wards: [],
    loading: false,
    error: null,
    wardDetails: null
}

export const WardSlice = createSlice({
    name: 'wards',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // get wards
            .addCase(getWards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWards.fulfilled, (state, action: PayloadAction<Ward[]>) => {
                state.loading = false;
                state.wards = action.payload;
            })
            .addCase(getWards.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
            })
            // get a ward details
            .addCase(getWardDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWardDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.wardDetails = action.payload;
            })
            .addCase(getWardDetails.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
            })
            // add new ward
            .addCase(addNewWard.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNewWard.fulfilled, (state, action) => {
                state.loading = false;
                state.wards = [...<[]>state.wards, action.payload];
            })
            .addCase(addNewWard.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
                state.error = 'Error Occured to add a new patient';
            })
            // edit ward Details
            .addCase(editWardDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(editWardDetails.fulfilled, (state, action) => {
                const updatedPatient = action.payload
                state.loading = false;
                state.error = null
                state.wards = state.wards?.map(ward => ward._id === updatedPatient._id ? updatedPatient : ward)
                state.wardDetails = updatedPatient;
            })
            .addCase(editWardDetails.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
                state.error = 'Error Occured to edit a ward details';
            })
            // delete ward
            .addCase(deleteWard.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteWard.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null
                state.wards = state.wards?.filter(ward => ward._id !== action.payload._id);
            })
            .addCase(deleteWard.rejected, (state, action) => {
                console.log('Error Generated: ');
                console.log(action);
                state.loading = false;
                state.error = 'Error Occured to delete a ward';
            })
    }
})

export default WardSlice.reducer;