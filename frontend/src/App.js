import './App.css';
import {useEffect, useRef, useState} from "react";
import HomePage from "./home-page/title-background";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {lightBlue} from "@mui/material/colors";
import MatchesList from "./match-cards/MatchesList";




function App() {
    const [matches,setMatches] = useState([])
  const userNameRef = useRef();
  const [regionData,setRegionData] = useState([])
  const [region, setRegion] = useState('')

  useEffect( ()=>{
    async function getRegions () {
      const response = await fetch('http://localhost:4000/regions', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              //  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
      )
      if (response.status === 200) {
        let data = await response.text();
        data = JSON.parse(data);

        setRegionData(data);
      }
    }
    getRegions()
  },[])

    async function getUser(e) {
      console.log(userNameRef)
        console.log(userNameRef);
        const userName = userNameRef.current.value;
        if (userName === '') return

        const uri = 'http://localhost:4000/?userName=' + userName + '&regionid=' + region;
        console.log(uri)
        const userData = await fetch(uri, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    //  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        if (userData.status === 200) {
            let data = await userData.text();
            data = JSON.parse(data);

            setMatches(data['matches']);
            console.log(data['matches']);
        }

    }

  const changeRegion = (value) =>{
    setRegion(value.target.value);


  }
  return (
      <>
          <div className="App-header" style={{display: 'flex', alignItems: 'center' ,justifyContent:'center', flexDirection:'column', height:'100%'}}>
              <HomePage />
              <span style={{ display:'flex', flexDirection:'row', padding:'20px', width: '100%', justifyContent:'center', alignItems:'center'}}>
                  <TextField color='primary' inputRef={userNameRef} style={{margin:'20px',height:'50px'}} type="text" id="outlined-basic"
                             label="Please Enter User Name" variant="filled" focused />
                  <Button onClick={getUser} style={{margin:'20px', height:'50px'}} variant="contained">Search for user</Button>
                  <Box sx={{maxWidth: 120, minWidth:'120'}}>
                      <FormControl fullWidth>
                  <InputLabel id="RegionDropDown" className="App-link">Region</InputLabel>
                  <Select labelId="RegionDropDown" id="selectRegion" value={region}  onChange={changeRegion} sx={{width:120, height: 50, color: lightBlue}}>
                      {regionData.map((region)=>{
                          return <MenuItem className='App-link' key={region} value={region}>{region}</MenuItem>
                      })
                      }
                  </Select>
                          </FormControl>
                      </Box>
              </span>
              {(userNameRef.current !== undefined) &&(
              <MatchesList matches={matches}  user={userNameRef.current.value}/>
                  )}

          </div>




      </>

  );
}

export default App;
