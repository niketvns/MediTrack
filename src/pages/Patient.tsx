import {FC, useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/pages/patient.module.css'
import ModelWrapper from '../components/ModelWrapper'
import Button from '../components/ui/Button';
import BodyWrapper from '../components/BodyWrapper'
import {HiOutlineUser} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {deletePatient, getPatients} from '../redux/services/patientServices'
import PatientForm from '../components/PatientForm'

type Props = {}

const Patient: FC<Props> = ({}): JSX.Element => {
    const [isFormModel, setIsFormModel] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const {allPatients, loading} = useSelector(({patients}) => patients);

    useEffect(() => {
        dispatch(getPatients());
    }, [])

    const deletePatientFunc = (patientId: string) => {
        dispatch(deletePatient(patientId))
    }

    return (
        <BodyWrapper>
            <Navbar title='Patient Portal' />
            <Button onClick={() => setIsFormModel(prev => !prev)}>Add New Patient</Button>
            {
                isFormModel &&
                <ModelWrapper>
                    <PatientForm setIsFormModel={setIsFormModel} />
                </ModelWrapper>
            }
            <div className={styles.patients}>
                <h2>All Patient Details</h2>
                {
                    loading ? <h1>Loading...</h1> :
                        allPatients?.map((patient: Patient) => (
                            <div key={patient?._id} className={styles['patient-item']}>
                                <Link to={`/patient/${patient?._id}`}>
                                    <HiOutlineUser />
                                    {patient?.name}
                                </Link>
                                <button onClick={() => deletePatientFunc(patient?._id)}>Delete</button>
                            </div>
                        ))
                }
            </div>

        </BodyWrapper>
    )
}

export default Patient;