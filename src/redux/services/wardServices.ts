import {createAsyncThunk} from "@reduxjs/toolkit";

// fetch all wards
export const getWards = createAsyncThunk(
    'wards/get',
    async (_) => {
        try {
            let res: Response = await fetch("https://patient-management-api.vercel.app/api/wards");
            let data = await res.json();
            return data.wards;
        } catch(error) {
            console.log(error);
        }
    }
)

// get a ward details
export const getWardDetails = createAsyncThunk(
    'wardDetails/get',
    async (wardId: string | undefined) => {
        try {
            let res: Response = await fetch(`https://patient-management-api.vercel.app/api/wards/${wardId}`);
            let data = await res.json();
            return data.foundWard;
        } catch(error) {
            console.log(error);
        }
    }
)


// add a new ward
export const addNewWard = createAsyncThunk(
    'addWard/post',
    async (wardDetails: Partial<Ward>) => {
        try {
            let res: Response = await fetch(`https://patient-management-api.vercel.app/api/wards`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(wardDetails)
            });
            let data = await res.json();
            if(data.status !== "ok") {
                throw new Error();
            }
            return data.addedWard;
        } catch(error) {
            console.log(error);
        }
    }
)

// delete a ward
export const deleteWard = createAsyncThunk(
    'deleteward/delete',
    async (wardId: string | undefined) => {
        try {
            let res: Response = await fetch(`https://patient-management-api.vercel.app/api/wards/${wardId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            let data = await res.json();
            return data.deletedWard;
        } catch(error) {
            console.log(error);
        }
    }
)

// edit a ward details
export const editWardDetails = createAsyncThunk(
    'editWardDetails/put',
    async (wardDetails: Partial<Patient>) => {
        try {
            let res: Response = await fetch(`https://patient-management-api.vercel.app/api/patients/${wardDetails._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: wardDetails.name, age: wardDetails.age, gender: wardDetails.gender, contact: wardDetails.contact})
            });
            let data = await res.json();
            return data.updatedWard;
        } catch(error) {
            console.log(error);
        }
    }
)