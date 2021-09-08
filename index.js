const express = require('express');
const app = express();
const router = require('./src/routes/routes');
const cors = require('cors');

app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use('/',router);

const port = 4040;
app.listen(port, ()=>{
    console.log(`O servidor está rodando na porta ${port}`);
})