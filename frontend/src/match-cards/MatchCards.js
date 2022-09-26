
import React, {useEffect, useState} from "react";
import "./match_Cards.css"
import {Divider, List, ListItem} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function MatchCards({match}){
    const [participantData,setParticipantData] = useState([]);
    const [matchData,setMatchData] = useState({"info": {'gameMode': '','participants': []}, 'metadata':{}})
    const [time,setTime] = useState('')
    const current = match;
    const [show,setExpand] = useState(false);

    useEffect( ()=>{
        if(current !== '') {
            console.log(current)
            const getMatch = async () => {
                console.log(current);
                const uri = 'http://localhost:4000/match-data/' + current
                const fetchMatch = await fetch(uri, {
                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            //  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                )
                if (fetchMatch.status === 200) {
                    let data = await fetchMatch.text();
                    data = JSON.parse(data);
                    setParticipantData(data['info']['participants'].sort((a,b)=>{return a['teamId'] - b['teamId']}));
                    setMatchData(data);
                    setTime(new Date(data['info']['gameEndTimestamp'] * 1000).toLocaleDateString("en-US"))
                    console.log(matchData)

                }


            }

            getMatch()
        }
    },[current])



const expand = ()=>{

        setExpand(!show);
        if(show) {

        }else {

        }
}


    return (
        <>
        <div style={{height:'25px'}}></div>
        <div  style={{display:'flex', outlineStyle:"solid",outlineColor:'white',borderRadius:'10px', flexDirection:'row'}}>

            <div style={{textAlign: "center", width:'800px'}}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                        <div className='column'>
                            <div>{matchData['info']["gameMode"]}</div>
                            <div>{time}</div>
                        </div>
                    <div>
                    {current}
                    </div>

                        <button style={{alignItems:'center', margin:'20px',borderColor:"transparent", backgroundColor:"transparent"}} onClick={expand}>
                            {(show) &&(
                            <ArrowUpwardIcon></ArrowUpwardIcon>
                            )}
                            {(!show) &&(
                            <ArrowDownwardIcon></ArrowDownwardIcon>
                                )}
                            </button>
                    </div>

                    {(show) &&(

                    <List style={{ outlineColor:'white' , borderRadius:'10px',margin:'40px', height:'100%'}}>
                        <div style={{height:'20px'}}></div>

                        {  participantData.map((par,indexP)=>{

                            return <>
                                {(indexP === 5) &&(
                                    <div style={{height:'5px',backgroundColor:'silver',borderRadius:'30px'}}></div>
                                )}

                                <ListItem style={{
                                flexDirection:'row',height: 'fit-content', borderWidth:'thick 10px'
                                ,outlineStyle:'solid',backgroundColor: par['win']? 'blue': 'red', borderRadius:'10px',margin:'20px',}}>
                                <span style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',}}>

                                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/" + par['championName'] + '.png'}
                                         style={{width:'50px',height:'50px'}} />
                                    <div className="column">
                                        <img src={"http://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/"
                                        + par['summoner1Id'] + '.png'
                                        }/>

                                    </div>
                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        Summoner Name
                                        <div> {par['summonerName']}</div>
                                    </div>

                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        Champion
                                        <div> {par['championName']}</div>
                                    </div>
                                    <span style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"6rem"}}>
                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        K
                                    <div> {par['kills']}</div>
                                    </div>
                                    <Divider orientation="vertical" variant="middle" flexItem />
                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        D
                                        <div>{par['deaths']}</div>
                                    </div>
                                     <Divider orientation="vertical" variant="middle" flexItem />
                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        A
                                        <div>{par['assists']}</div>
                                    </div>
                                        </span>
                                    <div className="column">
                                    <div className="row">
                                        <img
                                            src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                + par['item0'] + '.png'}
                                            style={{width:'50px',height:'50px'}}
                                        />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item1'] + '.png'}
                                             style={{width:'50px',height:'50px'}}
                                         />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item2'] + '.png'}
                                             style={{width:'50px',height:'50px'}}
                                         />


                                    </div>
                                    <div className="row">
                                        <img
                                            src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                + par['item3'] + '.png'}
                                            style={{width:'50px',height:'50px'}}
                                        />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item4'] + '.png'}
                                             style={{width:'50px',height:'50px'}}
                                         />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item5'] + '.png'}
                                             style={{width:'50px',height:'50px'}}
                                         />


                                    </div>
</div>
                                </span>
                            </ListItem>
                            <Divider></Divider>
                            </>
                        })}
                        <div style={{height:'20px'}}></div>
                    </List>
                        )}


                </div>
        </div>
        </>
    )



}
