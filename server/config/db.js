import mongoose from "mongoose";
//Function to connect to Mongodb database
const connectDB=async()=>{
mongoose.connection.on('connected',()=>console.log('Database Connecteded'))
await mongoose.connect(`${process.env.MONGODB_URI}/Job-Portall`)

}
export default connectDB
