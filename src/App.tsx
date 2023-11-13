import {FC} from 'react'
import './globals.css'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Patient from './pages/Patient'
import Ward from './pages/Ward'
import Sidebar from './components/Sidebar'
import PatientDetails from './pages/PatientDetails'
import WardDetails from './pages/WardDetails'

type Props = {}

const App: FC<Props> = (): JSX.Element => {

  return (
    <div className='App'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/patient' element={<Patient />} />
        <Route path='/patient/:patientId' element={<PatientDetails />} />
        <Route path='/ward' element={<Ward />} />
        <Route path='/ward/:wardId' element={<WardDetails />} />
      </Routes>
    </div>
  )
}

export default App
