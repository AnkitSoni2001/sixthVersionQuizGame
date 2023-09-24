const mongoose = require('mongoose');


const connectToMongo = async () => {
    const mongoURI = 'mongodb://127.0.0.1:27017/quiz';

    try{
        await mongoose.connect(mongoURI, (err)=>{
            if(err){
                console.log(err);
            }
            console.log('connected to mongo Successfully')
    })
    }catch(err){
        console.log(err)
  
    }
}

module.exports = connectToMongo;