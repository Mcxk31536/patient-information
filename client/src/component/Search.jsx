import React, { useEffect, useRef, useState } from 'react'
import "./Search.css"
import ImSearch from '../image/search-icon.png'
import axios from 'axios'

function Search() {
    const [Searchdata, setSearchdata] = useState([])
    const [from, setfrom] = useState()
    const [sub, setsub] = useState('')


    useEffect(() => {
        axios.post("http://localhost:3000/Search_patient_information", {
            searchfrom: from,
            typingSearch: sub
        })
            .then((res) => {
                console.log("search data :", res.data);
                setSearchdata(res.data)
            })
            .catch((err) => {
                console.log("err : ", err)
            })
        console.log(from)
        console.log(sub)
    }, [from, sub])

    return (
        <div className='ALL-Search'>
            <form  >
                <label> Search from :
                    <select onChange={(e) => setfrom(e.target.value)}>
                        <option > </option>
                        <option value='sex'>Sex</option>
                        <option value="process">Process</option>
                        <option value="status">Status</option>
                    </select>
                    {from == "sex" ?
                        <select onChange={(e) => setsub(e.target.value)}>
                            <option > </option>
                            <option value='Female'>Female</option>
                            <option value="Male">Male</option>
                        </select>
                        : <></>
                    }
                    {from == "process" ?
                        <select onChange={(e) => setsub(e.target.value)}>
                            <option > </option>
                            <option > Enter Process  </option>
                            <option value="Consult">consult</option>
                            <option value="Admit">admit</option>
                            <option value="Prescription">prescription</option>
                        </select>
                        :<></>
                    }
                    {from == "status" ?
                        <select onChange={(e) => setsub(e.target.value)}>
                            <option > </option>
                            <option > Enter Status  </option>
                            <option value="On process">On process</option>
                            <option value="Done">Done</option>
                
                        </select>
                        :<></>
                    }
                    
                </label>
            </form>
            <table>
                {Searchdata != "" ?
                    <tr>
                        <th >id</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>phone</th>
                        {/* <th>weight(kg)</th> */}
                        <th>symptoms</th>
                        <th>process</th>
                    </tr> : <></>
                }
                {Searchdata.map((val) => {
                    return (
                        <tr>
                            <td >{val.id}</td>
                            <td>{val.firstname}</td>
                            <td>{val.lastname}</td>
                            <td>{val.phone}</td>
                            {/* <th>weight(kg)</th> */}
                            <td>{val.symptoms}</td>
                            <td>{val.process}</td>
                        </tr>
                    )
                }
                )
                }
            </table>
            {Searchdata != "" ?
                <></> :
                <div className='scropeimg'>
                    <div className='linearoundimgSearch'></div>
                    <img className='imgSearch' src={ImSearch} alt="" />
                </div>
            }
        </div>
    )
}

export default Search