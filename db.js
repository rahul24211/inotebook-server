import mongoose from "mongoose";

const dbConnect = () => {
   try {
      mongoose.connect(process.env.MONGO_URL)
      console.log('MONGODB CONNECT SUCCESSFULLY');
   } catch (error) {
      console.log(error);

   }


}
export default dbConnect
