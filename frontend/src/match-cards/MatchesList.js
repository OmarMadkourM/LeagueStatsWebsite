import React from "react";
import MatchCards from "./MatchCards";

export default function MatchesList({matches}){



/*    if(matches.hasOwnProperty('matches'))*/
    return(

         matches.map((match) => {
                return <MatchCards key={match} match={match}/>
            })






    )


}
