const mongoose=require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  };
connectDB=async()=>{
    try {
      mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
      // await mongoose.connect(
      //   "mongodb+srv://course:zpCFJE8mq3Uk9y05@cluster0.jlhhi.mongodb.net/coursedb?retryWrites=true&w=majority",options
      // )
      await mongoose.connect(
        "mongodb://localhost:27017/classonline",options
      )
      console.log("Mongo Connected");
    }catch(err){
      console.error('here is the error',err);
      process.exit(1)
    }
}

module.exports=connectDB;