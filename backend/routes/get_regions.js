const express = require('express');
const router = express.Router();
const apiRoutes = require('../config')

router.get('/',async (req,res)=>{

   const regions = Object.keys(apiRoutes.key)
    res.send(regions);


}
)

module.exports = router;
