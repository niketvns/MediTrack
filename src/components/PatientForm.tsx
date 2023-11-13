import {FC, FormEvent, Dispatch, SetStateAction, useState, ChangeEvent, useEffect} from 'react'
import styles from '../styles/components/form.module.css';
import {AiOutlineClose} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {addNewPatient} from '../redux/services/patientServices';
import {getWards} from '../redux/services/wardServices';

type Props = {
    setIsFormModel: Dispatch<SetStateAction<boolean>>
}

const PatientForm: FC<Props> = ({setIsFormModel}) => {
    const [formData, setFormData] = useState<Partial<Patient>>({
        name: '',
        age: 0,
        gender: '',
        medicalHistory: ['fever', 'doc'],
        contact: 0,
        ward: ''
    })
    const {wards, loading} = useSelector(({wards}) => wards);
    const dispatch = useDispatch<any>();

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        if(formData.name && formData.age && formData.gender && formData.medicalHistory?.length && formData.contact) {
            dispatch(addNewPatient(formData));
            setIsFormModel(false);
        } else {
            alert("Please Fill all fields")
        }
    }


    useEffect(() => {
        dispatch(getWards());
    }, [])

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        if(name === 'age' && Number(value) > 200) {
            return alert('age should be less then 200')
        }
        if(name === "medicalHistory") {
            setFormData(prev => ({...prev, [name]: value.split(",").map((str: string) => str.trim())}))
            return;
        }
        setFormData(prev => ({...prev, [name]: value}))
    }

    return (
        <div className={styles.form}>
            <div className={styles.close} onClick={() => setIsFormModel(prev => !prev)}>
                <AiOutlineClose />
            </div>
            <form onSubmit={formSubmitHandler}>
                <h2>Add New Patient</h2>
                <div className={styles.label_input}>
                    <label>Name</label>
                    <input type="text" name='name' placeholder='ex: John Doe' onChange={inputChangeHandler} value={formData.name} />
                </div>
                <div className={styles.label_input}>
                    <label>Age (years)</label>
                    <input type="number" name='age' placeholder='ex: 45' min='0' onChange={inputChangeHandler} value={!!formData.age ? formData.age : ""} />
                </div>
                <div className={styles.label_input}>
                    <label>Gender</label>
                    <select name="gender" onChange={inputChangeHandler} value={formData.gender}>
                        <option value="" disabled>--Select Gender--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non binary</option>
                    </select>
                </div>
                <div className={styles.label_input}>
                    <label>Medical History</label>
                    <input type="text" name='medicalHistory' placeholder='ex: fever, Dibetes' onChange={inputChangeHandler} value={formData.medicalHistory?.map(str => ` ${str}`)} />
                </div>
                <div className={styles.label_input}>
                    <label>Contact</label>
                    <input type="text" name='contact' placeholder='+91 XXXXXXXXXX' onChange={inputChangeHandler} value={!!formData.contact ? formData.contact : ""} />
                </div>
                <div className={styles.label_input}>
                    <label>Ward</label>
                    <select name="ward" onChange={inputChangeHandler} value={formData.ward as string}>
                        <option value="" disabled>--Select Ward--</option>
                        {
                            loading ? " Loading..." :
                                wards.map((ward: Ward) => (
                                    <option key={ward._id} value={ward._id}>{ward.specialization}</option>
                                ))
                        }
                    </select>
                </div>
                <button>Add Record</button>
            </form>
        </div>
    )
}

export default PatientForm;