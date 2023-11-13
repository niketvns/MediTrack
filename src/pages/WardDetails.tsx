import {FC, useEffect} from 'react'
import BodyWrapper from '../components/BodyWrapper';
import Navbar from '../components/Navbar';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getWardDetails} from '../redux/services/wardServices';

type Props = {}

const WardDetails: FC<Props> = ({}): JSX.Element => {

    const {wardId} = useParams();
    const dispatch = useDispatch<any>();
    const {wardDetails, loading} = useSelector(({wards}) => wards);

    // console.log(wardDetails, loading);


    useEffect(() => {
        dispatch(getWardDetails(wardId))
    }, [])

    return (
        <BodyWrapper>
            <Navbar title='Ward Details' />
            <div>
                <img src="https://www.comarkinstruments.net/wp-content/uploads/2020/04/Hospital-Ward-02-500.png" alt="ward-details" width={400} height={300} />
                <div>
                    <h3>Ward Number</h3>
                    <p>{loading ? "Loading..." : wardDetails?.wardNumber}</p>
                </div>
                <div>
                    <h3>Ward Capacity</h3>
                    <p>{loading ? "Loading..." : wardDetails?.capacity}</p>
                </div>
                <div>
                    <h3>Ward Specialization</h3>
                    <p>{loading ? "Loading..." : wardDetails?.specialization}</p>
                </div>
            </div>
        </BodyWrapper>
    )
}

export default WardDetails;