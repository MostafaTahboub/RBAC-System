import express from 'express';
import DB, { initDB } from './DB/dataSource';
import userRouter from './routes/user.route';
import permissionRouter from './routes/permission.router';
import roleRouter from './routes/role.router';
import 'dotenv/config';

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
   
app.use('/user', userRouter);
app.use('/role', roleRouter);
app.use('/permission', permissionRouter);

app.get('/app', (req, res) => {
    res.send("server is up ");
});
    
app.listen(PORT, () => {
    console.log(`app listen to port : ${PORT}`);
    initDB();
});

