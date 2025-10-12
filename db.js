import mongoose from "mongoose";

const dbConnect = async() => {
   try {
     await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlparser : true,
      useUnifiedTopology: true
     })
      console.log('MONGODB CONNECT SUCCESSFULLY');
   } catch (error) {
      console.log('mongodb connection failed',error);
process.exit(1)
   }


}
export default dbConnect
