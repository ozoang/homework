const express = require('express');
const app = express();
const port = 3000;
const solve24game = require('24game-solver/dist/24game-solver');

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
        const result = solve24game([num1, num2, num3, num4], 24);
        let A = '';
        for (i = 0; i < result.length; i++) {

            A += result[i] + ',\n'

        }
        if (result.length == 0) {
            res.send('Fail');
        } else {
            res.send('Success' + '\n' + A);
        }
    } else {
        // console.log('out')
        res.status(403).send('Forbidden');
    }

});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});