import  { useEffect, useState } from 'react'
import Axios from 'axios'
import './Patientninformation.css'

function Patientninformation() {
  const [Patientlist, setPatientlist] = useState([])
  const [edit, seteditprocess] = useState("editstatusclose")
  const [idstate, setidstate] = useState()
  const [newstatus, setnewstatus] = useState()
  const [pagestate, setpagestate] = useState(1)
  const [maxpagestate, setmaxpagestate] = useState()

  useEffect(() => {
    Axios.post('http://localhost:3000/pagestate_patient_information', {
      pagestate: pagestate
    })
      .then((res) => {
        // console.log("pagestate", pagestate)
        // console.log("Data page:", pagestate, res.data)
        setPatientlist(res.data);
      })
      .catch(err => {
        console.log("err",err)
      })
      console.log("err",pagestate)
    Axios.get('http://localhost:3000/maxpagestate_patient_information', {
    })
      .then((res) => {
        setmaxpagestate(res.data);
        // console.log("maxpagestate", maxpagestate)
      })
      .catch((err => console.log("err : ", err)))
    console.log("idstate", idstate)
  }, [ pagestate ,idstate, newstatus])

  const Open = (val) => {
    seteditprocess(() => "editstatusopen")
    setidstate(() => val.id);
    // console.log("open id", val.id)
  }

  const Change = (val) => {
    if (val.id === idstate) {
      seteditprocess("editstatusclose");
      console.log("close", val.id)
      Axios.put('http://localhost:3000/update_patient_information', {
        status: newstatus,
        id: val.id
      }).then(res => console.log("Database Message :", res.data))
        .catch((err => console.log("err : ", err)))
    } else {
      console.log("id :", val.id)
      console.log("idstate", idstate)
    }
  }

  const Clicknextpage = () => {
    maxpagestate.map((id) => {
      if ((pagestate > 0) && (pagestate < (id.countid) / 3)) {
        console.log("Count id :", id.countid)
        setpagestate((page) => page + 1)
      }
    })
  }

  const Clickbeforepage = () => {
    if (pagestate > 1) {
      setpagestate((page) => page - 1)
    }
  }
  return (
    <div className='patientninformation'>
      <table>
        <tr>
          <th >id</th>
          <th>firstname</th>
          <th>lastname</th>
          <th>phone</th>
          {/* <th>weight(kg)</th> */}
          <th>symptoms</th>
          <th>procss</th>
          <th>status</th>
        </tr>

        {Patientlist.map((val) => {
          return (
            <tr >
              <td > {val.id}</td>
              <td > {val.firstname}</td>
              <td> {val.lastname}</td>
              <td > {val.phone}</td>
              <td > {val.symptoms}</td>
              <td > {val.process}</td>
              <td style={{width:300}}> {val.status}
                {(idstate === val.id) ?
                  <td className='val-status'>
                    <select className={edit} onChange={(e) => { setnewstatus(e.target.value) }}>
                      <option >Enter Process </option>
                      <option value="On process">On process</option>
                      <option value="Done">Done</option>
                    </select>
                  </td>
                  : <></>
                }
                <button className='edit' onClick={() => Open(val)} >Edit</button>
                <button className='change' onClick={() => { Change(val) }} >Change</button>
              </td>
            </tr >
          )
        })}

      </table>
      <div className='btn-beforepage-btn-nextpage'>
        <button className='btn-beforepage' onClick={Clickbeforepage}>&#10148;</button>{pagestate}
        <button className='btn-nextpage' onClick={Clicknextpage}>&#10148;</button>

      </div>
    </div>
  )
}

export default Patientninformation;