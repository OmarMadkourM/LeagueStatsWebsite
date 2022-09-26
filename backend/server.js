const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

var corsOptions = {
    origin: ["http://localhost:4000","http://localhost:3000",
    ]
};
app.use(cors(corsOptions));


// just checking server status
app.get('/',(async (req, res) => {

    res.send('Server Up');

}))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
