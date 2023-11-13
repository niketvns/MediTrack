import {FC, useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import ModelWrapper from '../components/ModelWrapper'
import Button from '../components/ui/Button';
import BodyWrapper from '../components/BodyWrapper'
import {RiHospitalLine} from 'react-icons/ri'
import {useDispatch, useSelector} from 'react-redux'
import {deleteWard, getWards} from '../redux/services/wardServices';
import {Link} from 'react-router-dom';
import styles from '../styles/pages/ward.module.css'
import WardForm from '../components/WardForm';

type Props = {}

const Ward: FC<Props> = ({}): JSX.Element => {
    const [isFormModel, setIsFormModel] = useState<boolean>(false);
    const dispatch = useDispatch<any>();
    const {wards, loading} = useSelector(({wards}) => wards);


    useEffect(() => {
        dispatch(getWards());
    }, [])

    return (
        <BodyWrapper>
            <Navbar title='Ward Portal' />
            <Button onClick={() => setIsFormModel(prev => !prev)}>Add New Ward</Button>
            {
                isFormModel &&
                <ModelWrapper>
                    <WardForm setIsFormModel={setIsFormModel} />
                </ModelWrapper>
            }
            <div className={styles.wards}>
                <h2>All Wards</h2>
                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        wards.map((ward: Ward) => (
                            <div key={ward._id} className={styles['ward-item']}>
                                <Link to={`/ward/${ward?._id}`}>
                                    <RiHospitalLine />
                                    {ward.wardNumber} - {ward.specialization}
                                </Link>
                                <button onClick={() => dispatch(deleteWard(ward._id))}>Delete</button>
                            </div>
                        ))
                    )
                }
            </div>
        </BodyWrapper>
    )
}

export default Ward;