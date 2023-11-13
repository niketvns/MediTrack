import {FC, useEffect, useState, ChangeEvent} from 'react'
import BodyWrapper from '../components/BodyWrapper';
import Navbar from '../components/Navbar';
import styles from '../styles/pages/patientDetails.module.css';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {editPatientDetails, getPatientDetails} from '../redux/services/patientServices';
import Button from '../components/ui/Button';
import {AiOutlineEdit} from 'react-icons/ai';
import {BiSave} from 'react-icons/bi';

type Props = {}

const PatientDetails: FC<Props> = ({}): JSX.Element => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [formData, setFormData] = useState<Partial<Patient>>({
        name: '',
        age: 0,
        gender: '',
        contact: 0
    })
    const {patientId} = useParams();
    const dispatch = useDispatch<any>();
    const {patientDetails, loading} = useSelector(({patients}) => patients);

    useEffect(() => {
        dispatch(getPatientDetails(patientId))
    }, [])

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        if(name === 'age' && Number(value) > 200) {
            return alert('age should be less then 200')
        }
        setFormData(prev => ({...prev, [name]: value}))
    }

    const submitFormData = () => {
        if(formData.name && formData.age && formData.gender && formData.contact) {
            dispatch(editPatientDetails({_id: patientId, ...formData}))
            setIsEdit(false);
        } else {
            alert('Please fill all input')
        }
    }

    return (
        <BodyWrapper>
            <Navbar title='Patient Details' />
            {
                loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div className={styles['patient-details']}>
                        <div className={styles.profile}>
                            <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="img" />
                            {
                                isEdit ? <input type="text" name='name' value={formData?.name} placeholder='ex: John Doe' onChange={inputChangeHandler} /> :
                                    <p>{patientDetails?.name}</p>
                            }
                        </div>
                        <div className={styles["ind-details"]}>
                            <p>Age</p>
                            <div>
                                {isEdit ? <input type="number" name='age' value={formData?.age} placeholder='age' onChange={inputChangeHandler} /> : <b>{patientDetails?.age}</b>}
                            </div>
                        </div>
                        <div className={styles["ind-details"]}>
                            <p>Gender</p>
                            <div>
                                {isEdit ? <select name="gender" onChange={inputChangeHandler} value={formData.gender}>
                                    <option value="" disabled>--Select Gender--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary">Non binary</option>
                                </select> : <b>{patientDetails?.gender}</b>}
                            </div>
                        </div>
                        <div className={styles["ind-details"]}>
                            <p>Contact</p>
                            <div>
                                {isEdit ? <input type="number" name='contact' value={formData?.contact} placeholder='contact' onChange={inputChangeHandler} /> : <b>+91{" "}{patientDetails?.contact}</b>}
                            </div>
                        </div>
                        <div className={styles["ind-details"]}>
                            <p>Ward Number</p>
                            <div>
                                <b>{patientDetails?.ward?.wardNumber}</b>
                            </div>
                        </div>
                        <div className={styles["ind-details"]}>
                            <p>Ward Type</p>
                            <div>
                                <b>{patientDetails?.ward?.specialization}</b>
                            </div>
                        </div>
                        <div className={styles["ind-details"]}>
                            <p>Medical History</p>
                            <div>
                                {
                                    patientDetails?.medicalHistory.map((history: string, ind: number) => (
                                        <b key={history}>{history}{patientDetails?.medicalHistory.length - 1 === ind ? null : ", "}</b>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            {
                !loading &&
                (isEdit ?
                    (
                        <>
                            <Button onClick={submitFormData}><BiSave />  Save</Button>
                            <Button onClick={() => setIsEdit(false)}><BiSave />  Close</Button>
                        </>
                    ) :
                    <Button onClick={() => setIsEdit(true)}> <AiOutlineEdit /> Edit</Button>)
            }
        </BodyWrapper>
    )
}

export default PatientDetails;