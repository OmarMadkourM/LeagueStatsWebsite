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
//creating routes

app.use('/match-data', require('./routes/matche_info'));
app.use('/get-user', require('./routes/getName'));
app.use('/regions', require('./routes/get_regions'));
// just checking server status

// gets userData
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
            const urlII = apiRoutes.key[region] + '/lol/match/v5/matches/by-puuid/' + data['puuid'] + '/ids?start=0&count=5';
            // get match data aswell
            const getMatches = await fetch(urlII ,{
                    method: 'GET',
                    headers: {
                        "X-Riot-Token": apiRoutes.secret,
                    },


                }
            )
            if (getMatches.status === 200) {
                let data1 = await getMatches.text();
                data1 = JSON.parse(data1);
                var results = {matches: data1, user: data}
                res.send(results);
                // handle data
            }else{
                let data = 'User not found'
                // res.err(data);
            }

            // res.send(data);
            // handle data
        }else{
            let data = 'User not found'
            res.send(data);
        }
    }
        ))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
