import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Button from './component/Button'
import Addpatient from './component/Addpatient'
import Patientninformation from './component/Patientninformation'
import Search from './component/Search'

function App() {
  return (
    <body>
      <div className='Navsideand-Route'>
        <Button />

        <div className='RouteButton'>
          <Routes>
            <Route path="" element={<Addpatient />} />
            <Route path="/Addpatient" element={<Addpatient />} />
            <Route path="/Patientninformation" element={<Patientninformation />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
      
    </body>
  )
}

export default App;
