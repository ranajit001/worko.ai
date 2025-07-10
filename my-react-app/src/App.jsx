import './App.css'
import Dashboard from './pages/dash'
import JobApplicationForm from './pages/apply'
import { Route,Routes } from 'react-router-dom'
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<JobApplicationForm/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App
