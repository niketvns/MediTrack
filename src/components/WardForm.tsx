import {FC, FormEvent, Dispatch, SetStateAction, useState, ChangeEvent} from 'react'
import styles from '../styles/components/form.module.css';
import {AiOutlineClose} from 'react-icons/ai';
import {addNewWard} from '../redux/services/wardServices';
import {useDispatch} from 'react-redux';

type Props = {
    setIsFormModel: Dispatch<SetStateAction<boolean>>
}

const WardForm: FC<Props> = ({setIsFormModel}) => {
    const [formData, setFormData] = useState<Partial<Ward>>({
        wardNumber: 0,
        capacity: 0,
        specialization: ''
    })
    const specialization: Array<string> = ["General", "Emergency", "ICU", "Nursery", "Pediatrics", "Surgery"];
    const dispatch = useDispatch<any>();

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        if(formData.wardNumber && formData.capacity && formData.specialization) {
            dispatch(addNewWard(formData));
            setIsFormModel(false);
        } else {
            alert("Please Fill all fields")
        }
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}))
    }

    return (
        <div className={styles.form}>
            <div className={styles.close} onClick={() => setIsFormModel(prev => !prev)}>
                <AiOutlineClose />
            </div>
            <form onSubmit={formSubmitHandler}>
                <h2>Add New Ward</h2>
                <div className={styles.label_input}>
                    <label>Ward Number</label>
                    <input type="number" name='wardNumber' placeholder='ex: 45' min='0' value={formData.wardNumber} onChange={inputChangeHandler} />
                </div>
                <div className={styles.label_input}>
                    <label>Capacity</label>
                    <input type="number" name='capacity' placeholder='ex: 45' min='0' value={formData.capacity} onChange={inputChangeHandler} />
                </div>
                <div className={styles.label_input}>
                    <label>Specialization</label>
                    <select name="specialization" value={formData.specialization} onChange={inputChangeHandler}>
                        <option value="" disabled>--Select Specialization--</option>
                        {
                            specialization.map(data => (
                                <option key={data} value={data}>{data}</option>
                            ))
                        }
                    </select>
                </div>
                <button>Add Record</button>
            </form>
        </div>
    )
}

export default WardForm;