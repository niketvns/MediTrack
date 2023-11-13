import {FC, useEffect} from 'react';
import Navbar from '../components/Navbar';
import BodyWrapper from '../components/BodyWrapper'
import {useDispatch, useSelector} from 'react-redux';
import {getWards} from '../redux/services/wardServices';
import {getPatients} from '../redux/services/patientServices';

type Props = {}

const Dashboard: FC<Props> = ({}): JSX.Element => {

    const dispatch = useDispatch<any>();
    const {patients: {allPatients, loading}, wards: {wards}} = useSelector(({patients, wards}) => ({patients, wards}));

    useEffect(() => {
        dispatch(getWards());
        dispatch(getPatients());
    }, [])

    const totalPatients = allPatients?.length;
    const totalWards = wards?.length;
    const totalBeds = wards.reduce((acc: any, ward: Ward) => acc + ward.capacity, 0)
    const totalOccupancy = ((totalPatients * 100) / totalBeds).toFixed(2);
    const wardCount = allPatients.reduce((acc: any, patient: Patient): any => {
        acc[patient.ward?.wardNumber] = (acc[patient.ward?.wardNumber] ?? 0) + 1
        return acc;
    }, {})

    let topWard: Array<any> = [];

    type wardAcc = Array<any>

    if(wardCount) {
        topWard = Object.entries(wardCount).reduce((acc: wardAcc, ward: wardAcc): any => ward[1] >= acc[1] ? ward : acc, Object.entries(wardCount)[0])
    }

    return (
        <BodyWrapper>
            <Navbar title='Dashbaord' />
            <div>
                <h3>Total Patients</h3>
                <p>{loading ? "Loading..." : totalPatients}</p>
            </div>
            <div>
                <h3>Total Wards</h3>
                <p>{loading ? "Loading..." : totalWards}</p>
            </div>
            <div>
                <h3>Total Capacity</h3>
                <p>{loading ? "Loading..." : totalBeds}</p>
            </div>
            <div>
                <h3>Total Occupancy Rate</h3>
                <p>{loading ? "Loading..." : totalOccupancy}%</p>
            </div>
            <div>
                <h3>Top Ward</h3>
                <p>{topWard?.length ? topWard[0] : 'Loading...'}</p>
            </div>
        </BodyWrapper>
    )
}

export default Dashboard;