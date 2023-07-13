const mongoose= require('mongoose');

const DB= process.env.URL;

mongoose.connect(DB ,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("Connection Successfull")
}).catch((err)=>{
    console.log(err ,"No Connection")
})