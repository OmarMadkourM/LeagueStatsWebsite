const express = require('express');
const apiRoutes = require("../config");
const router = express.Router();


router.get('/:id',async (req,res)=>{
    console.log(apiRoutes.secret);
    const matchId = req.params.id;
    const region = 'NA1'
    const urlI = apiRoutes.key[region] + '/lol/match/v5/matches/' + matchId

    const match = await fetch(urlI,{
            method: 'GET',
            headers: {
                "X-Riot-Token": apiRoutes.secret,
            },


        }
    )

    if(match.status === 200){
        let matchData = await match.text();
        matchData = JSON.parse(matchData);
        res.send(matchData)

    }else{
        res.sendStatus(match.status);
    }

})

module.exports = router;
