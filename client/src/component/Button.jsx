import '../component/Button.css'
import { NavLink} from 'react-router-dom' 

function Button() {

  return (
    <div className='Div-2Button'>
      <NavLink to= "Addpatient" className='Cbutton'>Add patient</NavLink >
      <NavLink to= "Patientninformation" className='Cbutton'>Patient information </NavLink >
      <NavLink to= "Search" className='Cbutton'>Search</NavLink >
    </div>
  )
}

export default Button
