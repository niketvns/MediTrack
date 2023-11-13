type InitialState = {
    allPatients?: Patient[],
    loading: boolean,
    error: string | null,
    wards?: Ward[],
    patientDetails?: Patient | null,
    wardDetails?: Ward | null,
}

type State = {
    patients?: InitialState;
    wards?: InitialState;
}