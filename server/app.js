const express = require('express');
const app = express();
const {port, hostname} = require('./config/config');
const indexRoute = require('./routes/index');
app.use('/',indexRoute);
app.listen(port, hostname,()=>{
    console.log(`server listening on port ${port}`);
});