import React from "react";
import MatchCards from "./MatchCards";

export default function MatchesList({matches,user}){



/*    if(matches.hasOwnProperty('matches'))*/
    return(

         matches.map((match) => {
             if(user.length > 0){
                 return <MatchCards key={match} match={match} user={user}/>
             }

                return <MatchCards key={match} match={match}/>
            })






    )


}
