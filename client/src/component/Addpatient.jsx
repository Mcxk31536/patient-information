
import  { useEffect, useState } from 'react'
import Axios from 'axios';
import './Addpatient.css'

import Sweetalert from 'sweetalert2'

function Addpatient() {
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [sex , setsex]  = useState('');
    const [phone, setphone] = useState('');
    const [datebirth , setdatebirth ] = useState('');
    const [heightcm, setheightcm] = useState('');
    const [weightkg, setweightkg] = useState('');
    const [symptoms, setsymptoms] = useState('');
    const [Process,setProcess] = useState('');
    const [status,setstatus] = useState('');
    const [infirstname, setinfirstname] = useState(<br />);
    const [inlastname, setinlastname] = useState(<br />);
    const [insex , setinsex ] = useState(<br />)
    const [inphone, setinphone] = useState(<br />);
    const [indate ,setindate] = useState(<br />);
    const [inheightcm, setinheightcm] = useState(<br />);
    const [inweightkg, setinweightkg] = useState(<br />);
    const [insymptoms, setinsymptoms] = useState(<br />);
    const [inProcess , setinProcess] = useState(<br />);
    const [instatus,setinstatus] = useState(<br />);

    useEffect(() => {
    }, [firstname, lastname, phone, weightkg, heightcm, symptoms,datebirth])

    function regexCheckEnglish(text) {
        if (text.search(/^[a-zA-Z]+$/) == -1) {
            return false;
        }
        return true;
    }

    function regexCheckThai(text) {
        if (text.search(/^[ก-๙]+$/) == -1) {
            return false;
        }
        return true;
    }

    let regnum = /\d/
    
    const typingfirstname = (character) => {
        let cha = character.slice(-1)
        if ((regexCheckEnglish(character) == true) && (character.length <= 100)) {
            setfirstname(character)
        } 
        else if ((character.length < 2) && (regexCheckEnglish(cha) == false)) {
            setfirstname(``)
        }
    }

    const typinglastname = (character) => {
        let cha = character.slice(-1)
        if ((regexCheckEnglish(character) == true) && (character.length <= 100)) {
            setlastname(character)
        } else if ((character.length < 2) && (regexCheckEnglish(cha) == false)) {
            setlastname(``)
        }
    }

    const typingphone = (character) => {
        let cha = character.slice(-1)
        if ((character.length <= 10) && (regnum.test(cha) == true)) {

            setphone(character)
        } else if ((regnum.test(cha) == false) && character.length > 0) {
            setphone(phone +'')
        }
        else if (character.length > 10) {
            setphone(phone +'')
        }
        else if ((character.length < 2) && (regnum.test(cha) == false)) {
            setphone(``)
        }
        
    }

    const typingheightcm = (character) => {
        let regdot = /\./
        let cha = character.slice(-1)
        if ((character.length <= 5) && ((regnum.test(cha) == true) || (regdot.test(cha) == true))) {
            setheightcm(character)
        } else if ((regnum.test(cha) == false) && character.length > 0) {
            setheightcm(heightcm +'')
        }
        else if (character.length > 5) {
            setheightcm(heightcm +'')
        }
        else if ((character.length < 2) && (regnum.test(cha) == false)) {
            setheightcm(``)
        }
    }

    const typingweightkg = (character) => {
        let regdot = /\./
        let cha = character.slice(-1)
        if ((character.length <= 5) && ((regnum.test(cha) == true) || (regdot.test(cha) == true))) {
            setweightkg(character)
        } else if ((regnum.test(cha) == false) && character.length > 0) {
            setweightkg(weightkg + '')
        }
        else if (character.length > 5) {
            setweightkg(weightkg + '')
        }
        else if ((character.length < 2) && (regnum.test(cha) == false)) {
            setweightkg(``)
        }
    }

    const typingsymptoms = (character) => {
        let cha = character.slice(-1)
        if ((regexCheckThai(cha) == true) || (regexCheckEnglish(cha) == true) || (regnum.test(cha) == true)) {
            setsymptoms(character)
        } else if ((character.length < 2)) {
            setsymptoms(``)
        }
    }

    const Addpatient = async (e) => {
        e.preventDefault();
        if ((firstname != '') &&
            (lastname != '') &&
            (phone != '') &
            (datebirth != '') &&
            (heightcm != '') &&
            (weightkg != '') &&
            (symptoms != '') &&
            (Process != '') && 
            (sex != '') && 
            (status != '')
            ) {

            await Axios.post('http://localhost:3000/Add_patient_information', {
                firstname: firstname,
                lastname: lastname,
                sex:sex,
                phone: phone,
                date: datebirth,
                heightcm: heightcm,
                weightkg: weightkg,
                symptoms: symptoms,
                process: Process,
                status:status
            })
                .then(res => console.log("Database Message :", res.data))
                .catch((err => console.log("err : ", err)))
            console.log("Sucess")
            setfirstname("")
            setlastname("")
            setsex("")
            setphone("")
            setdatebirth("")
            setheightcm("")
            setweightkg("")
            setsymptoms("")
            setProcess("")
            setstatus("")

            Sweetalert.fire({
                title: 'Success!',
                text: 'Information added successfully.',
                icon: 'Success'
              })
        }
        firstname == "" ? setinfirstname(<div className='Please-Enter'>"Please enter a valid first name."</div>): setinfirstname(<br/>);
        lastname == "" ? setinlastname(<div className='Please-Enter'>"Please enter a valid last name."</div>) :setinlastname(<br/>);
        ((phone == "") || phone.length != 10) ? setinphone(<div className='Please-Enter'>"Please enter a valid a phone number."</div>) :setinphone(<br/>);
        datebirth == "" ? setindate(<div className='Please-Enter'>"Please enter a valid date of birth."</div>) :setindate(<br/>);
        heightcm == "" ? setinheightcm(<div className='Please-Enter'>"Please enter a valid height."</div>) : setinheightcm(<br/>);
        weightkg == "" ?setinweightkg(<div className='Please-Enter'>"Please enter a valid weight."</div>) : setinweightkg(<br/>);
        symptoms == "" ?setinsymptoms(<div className='Please-Enter'>"Please enter a valid symptoms."</div>) : setinsymptoms(<br/>);
        Process == "" ? setinProcess(<div className='Please-Enter'>"Please enter a valid status."</div>) : setinProcess(<br/>);
        sex == "" ? setinsex(<div className='Please-Enter'>"Please enter a valid sex."</div>) : setinsex(<br/>);
        status == "" ? setinstatus(<div className='Please-Enter'>"Please enter a valid status."</div>) : setinstatus(<br/>);
    }

    return (
        <div className='Addpatient'>
            <form onSubmit={Addpatient}>
                <div >
                <label>First name<br />
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => typingfirstname(e.target.value)}
                        placeholder='Enter first name'
                    />
                    <p>{infirstname}</p>
                </label>
                <label> Last name <br />
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => typinglastname(e.target.value)}
                        placeholder='Enter last name'
                    />
                    <p>{inlastname}</p>
                </label>
                <label>Sex <br />
                    <select value={sex}  onChange={(e) => setsex(e.target.value)}>
                        <option > Enter Sex  </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <p>{insex}</p>
                </label>
                <label> Phone <br />
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => typingphone(e.target.value)}
                        placeholder='Enter your number '
                    />
                    <p>{inphone}</p>
                </label>
                <label>Date of Birth <br />
                    <input
                        type="date"
                        value={datebirth}
                        onChange={(e) => setdatebirth(e.target.value)}
                    />
                    <p>{indate}</p>
                </label>
                <label> Height(cm) <br />
                    <input
                        type="text"
                        value={heightcm}
                        onChange={(e) => typingheightcm(e.target.value)}
                        placeholder='Enter height'
                    />
                    <p>{inheightcm}</p>
                </label>
                <label> Weight(kg) <br />
                    <input
                        type="text"
                        value={weightkg}
                        onChange={(e) => typingweightkg(e.target.value)}
                        placeholder='Enter weight'
                    />
                    <p>{inweightkg}</p>
                </label>
                <label> Symptoms <br />
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => typingsymptoms(e.target.value)}
                        placeholder='Enter symptoms'
                    />
                    <p>{insymptoms}</p>
                </label>
                <label> Process <br />
                    <select value={Process} onChange={(e) =>(setProcess(e.target.value))}>
                        <option > Enter Process  </option>
                        <option value="Consult">consult</option>
                        <option value="Admit">admit</option>
                        <option value="Prescription">prescription</option>
                    </select>
                    <p>{inProcess}</p>
                </label>
                <label> Status <br />
                    <select value={status} onChange={(e) =>(setstatus(e.target.value))}>
                        <option > Enter status  </option>
                        <option value="On process">On process</option>
                        <option value="Done">Done</option>
                    </select>
                    <p>{instatus}</p>
                </label>
                </div>
                <input className="btn-submit"  type="submit" />
            </form>
        </div>
    )
}

export default Addpatient;