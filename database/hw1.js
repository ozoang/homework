const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const JWT = require('jsonwebtoken');

app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customerdata'
});

con.connect((err) => {
    if (err) throw err;
    console.log("connect!");
})

const verify = (req, res, next) => {
    const token = req.headers['access-token'];
    try {
        const decoded = JWT.verify(token, secret);
        console.log(decoded);
    } catch (err) {
        return res.status(401).send('wrong token');
    }
    next();
}

//////////login/////////////
const secret = 'token'

const Data = [{
    user: "user",
    pass: "123"
}];

let loginData = {};


app.post('/login', async(req, res) => {

    try {
        const user = req.body.username;
        const pass = req.body.password;

        for (let i = 0; i < Data.length; i++) {

            if (user == Data[i].user && pass == Data[i].pass) {
                let token = await JWT.sign(Data[i], secret, {
                    expiresIn: '2h'
                });
                loginData = {
                    ...Data[i],
                    token
                }
                Data[i].token = token
                console.log({ loginData })

                return res.status(200).json({ loginData });
            }
        }

        console.log(user)
        console.log(pass)
        return res.send('wrong user or password');
    } catch (error) {
        console.log(error)
        return res.send('wrong user or password');
    }
});
//////////////////////////////////////////////////////////////////

app.get('/getData', verify, async(req, res) => {
    sql = "SELECT * FROM `customer`"
    con.query(sql, (error, result) => {
        if (error) { throw error }
        // console.log(result)
        res.json(result)
    })
})


app.put('/update', verify, async(req, res) => {

    sql =
        `UPDATE customer SET fname='${req.body.firstname}',lname='${req.body.lastname}',id='${req.body.id}',rank='${req.body.rank}',tel='${req.body.tel}',email='${req.body.email}' WHERE id=${req.body.iddelete}`;
    await con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Bad Request");
        }
        console.log('Update data success')
        return res.send("Update data success");
    })

});
app.post('/create', verify, async(req, res) => {

    let user_data = [
        [

            `${req.body.firstname}`,
            `${req.body.lastname}`,
            `${req.body.id}`,
            `${req.body.rank}`,
            `${req.body.tel}`,
            `${req.body.email}`

        ]
    ];

    sql =
        "INSERT INTO `customer` (`fname`, `lname`, `id`, `rank`, `tel`, `email`) VALUES?";
    await con.query(sql, [user_data], (err, result) => {
        if (err) { return res.status(400).send("Bad Request"); }
        console.log('add data success')
        return res.send("Add data success");
    })


});

app.delete('/delete', verify, (req, res) => {
    sql =
        `DELETE FROM customer WHERE id = ${req.body.id}`;
    id = req.body.id;
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).send("Bad Request");
        }
        console.log('delete data success')
        return res.send("Delete data success");
    })
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});