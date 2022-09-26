const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const apiRoutes = require('./config')


var corsOptions = {
    origin: ["http://localhost:4000","http://localhost:3000",
    ]
};
app.use(cors(corsOptions));


// just checking server status


app.get('/',(async  (req, res) => {
        var name = req.query.userName;
        var region = req.query.regionid
        var urlI = apiRoutes.api[region] + '/lol/summoner/v4/summoners/by-name/' + name;

        const user = await fetch(urlI, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "X-Riot-Token": apiRoutes.secret,
                    //  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },


            }
        )


        if (user.status === 200) {
            let data = await user.text();
            data = JSON.parse(data);
            res.send(data)
        }else{
            res.send(user.statusMessage)
        }
    }
        ))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
