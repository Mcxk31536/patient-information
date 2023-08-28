const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "Patient_Information"
})

db.connect((err) => {
    if (err) { consolelog("errrrrrr") }
    else { console.log("connecting mysql") }
})

app.post('/pagestate_patient_information', (req, res) => {
    const pagestate = req.body.pagestate
    console.log("pagestateee :", pagestate)
    const getdatafromsql = "SELECT `id` ,`firstname`,`lastname`,`phone`,`weightkg`,`symptoms`,`process` ,`status` FROM patientinformation  WHERE id BETWEEN ? AND ?  ;"
    db.query(getdatafromsql, [(((pagestate) * 3) - 2), (pagestate * 3)], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            // console.log(result)
        }
    });
});

app.get('/maxpagestate_patient_information', (req, res) => {
    const getcountidfromsql = "SELECT MAX(`id`) AS countid FROM patientinformation ;"
    db.query(getcountidfromsql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            // console.log(result)
        }
    });
});

app.post('/Add_patient_information', async (req, res) => {
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.sex,
        req.body.phone,
        req.body.date,
        req.body.heightcm,
        req.body.weightkg,
        req.body.symptoms,
        req.body.process,
        req.body.status
    ]
    const sql = "INSERT INTO patientinformation(`firstname`,`lastname` , `sex` ,`phone` ,`dateofbirth`, `heightcm`,`weightkg`,`symptoms`,`process`,`status`) VALUES(?)"
    console.log(req.body)
    await db.query(sql, [values], (result, err) => {
        if (err) return res.json(err);
        return res.json(result);
    }
    )
    console.log(values)
})

app.put('/update_patient_information', (req, res) => {
    const values = [
        req.body.status,
        req.body.id
    ]
    db.query("UPDATE patientinformation SET status= ? WHERE id = ? ", values, (result, err) => {
        if (err) return res.json(err);
        return res.json(result);
    }
    )
})

app.post('/Search_patient_information', (req, res) => {
    const searchfrom = req.body.searchfrom
    const values = [req.body.typingSearch]

    const getsearchfromsql = () => {
        if (searchfrom == 'sex') {
            return "SELECT * FROM patientinformation WHERE sex LIKE ?  ;";
        } else if (searchfrom == 'process') {
            return "SELECT * FROM patientinformation WHERE process LIKE ? ;";
        } else if (searchfrom == 'status') {
            return "SELECT * FROM patientinformation WHERE status LIKE ? ;";
        }
    }
    console.log("Value", getsearchfromsql())
    console.log("Value", searchfrom, values)

    db.query(getsearchfromsql()
        , values, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result)
            }
        });
});

app.get('/ChartData', (req, res) => {
    const getdatafromsql = "SELECT sex ,  COUNT(id ) AS COUNT FROM `patientinformation` GROUP BY sex;"
    db.query(getdatafromsql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log("Result :",result)
        }
    });
});

app.listen('3000', () => {
    console.log("server is runnig")
})