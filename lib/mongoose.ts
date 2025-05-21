import mongoose from 'mongoose';
let isConnected=false; // track the connection status
export const connectToDB= async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URI) return console.log('mongo uri is not defined');
    if(isConnected) return console.log('=> using existing db connection');
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected=true;
        console.log('mongo db connected');
    }
    catch(error){
        console.log(error);
    }



}