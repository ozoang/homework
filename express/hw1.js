const express = require('express');
const app = express();
const port = 3000;

app.get('/cal', (req, res) => {
    let num1 = Number(req.query.a);
    let num2 = Number(req.query.b);
    let num3 = Number(req.query.c);
    let num4 = Number(req.query.d);
    if (num1 >= 1 && num1 <= 9 &&
        num2 >= 1 && num2 <= 9 &&
        num3 >= 1 && num3 <= 9 &&
        num4 >= 1 && num4 <= 9
    ) {
        // console.log('in')
        res.send();
    } else {
        // console.log('out')
        res.status(403).send('Forbidden');
    }




});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});