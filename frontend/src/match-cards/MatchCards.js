
import React, {useEffect, useState} from "react";
import "./match_Cards.css"
import {Divider, List, ListItem} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
export default function MatchCards({match,user}){
    const [participantData,setParticipantData] = useState([]);
    const [matchData,setMatchData] = useState({"info": {'gameMode': '','participants': []}, 'metadata':{}})
    const [time,setTime] = useState('')
    const [gameTime,setGameTime] = useState('')
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
                    setTime(new Date(data['info']['gameEndTimestamp']).toLocaleDateString("en-US"))
                    setGameTime(new Date(data['info']['gameEndTimestamp']-data['info']['gameStartTimestamp']).toLocaleTimeString("en-US").slice(2,-2))
                    console.log(data)

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

            <div style={{textAlign: "center", width:'fit-content'}}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                        <div className='column'>
                            <div>{matchData['info']["gameMode"]}</div>
                            <div>{time}</div>
                            <div>{gameTime}</div>
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
                                ,outlineStyle:'solid',backgroundColor: par['win']? 'blue': 'red', borderRadius:'10px',margin:'10px',fontSize: '16px',fontWeight:'bold'}}>
                                <span style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',}}>

                                    <img src={"http://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/" + par['championName'] + '.png'}
                                         style={{width:'50px',height:'50px'}} />

                                    <div style={{width:'40px'}}></div>

                                    <div className="column">
                                        <img src={"http://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/"
                                        + par['summoner1Id'] + '.png'
                                        }/>

                                    </div>
                                    <div style={{width:'40px'}}></div>
                                    <div style={{display:"flex", flexDirection:'column',}}>
                                        Summoner Name
                                        <div style={{fontSize: '14px'}}> {par['summonerName']}</div>
                                    </div>
                                    <div style={{width:'40px'}}></div>
                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        Champion
                                        <div> {par['championName']}</div>
                                    </div>
                                    <div style={{width:'40px'}}></div>
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
                                    <div style={{width:'40px'}}></div>
                                    <div className="column">
                                        <div>Level {par['champLevel']}</div>
                                        <div className="row">
                                            {par['totalMinionsKilled']}
                                            ({par['totalMinionsKilled'] / parseFloat(gameTime.slice(0,-1))})
                                        </div>


                                    </div>
                                    <div style={{width:'40px'}}></div>
                                    <div className="column">
                                    <div className="row">
                                        <img
                                            src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                + par['item0'] + '.png'}
                                            alt={par['item0'] }
                                            onError="this.onerror=null; this.src={CheckBoxOutlineBlankIcon}"
                                            style={{width:'50px',height:'50px'}}
                                         />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item1'] + '.png'}
                                             alt={par['item1'] }
                                             style={{width:'50px',height:'50px'}}
                                         />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item2'] + '.png'}
                                             alt={par['item2'] }
                                             style={{width:'50px',height:'50px'}}
                                         />


                                    </div>
                                    <div className="row">
                                        <img
                                            src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                + par['item3'] + '.png'}
                                            alt={par['item3']}
                                                style={{width:'50px',height:'50px'}}
                                        />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item4'] + '.png'}
                                             alt={par['item4'] }
                                             style={{width:'50px',height:'50px'}}
                                         />
                                         <img
                                             src={'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/'
                                                 + par['item5'] + '.png'}
                                             alt={par['item5']}
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
