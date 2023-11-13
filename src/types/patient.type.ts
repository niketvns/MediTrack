type Patient = {
    _id: string;
    age: number;
    contact: number;
    createdAt?: Date;
    gender: string;
    medicalHistory: Array<string>;
    name: string;
    ward: Ward | string;
}