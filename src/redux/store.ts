import {configureStore} from "@reduxjs/toolkit";
import PatientReducer from './slices/patient.slice';
import WardReducer from './slices/ward.slice'

const store = configureStore({
    reducer: {
        patients: PatientReducer,
        wards: WardReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;