import mongoose from "mongoose";

const User = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true   
    },
    email:{
        type:String,
        required:true
    }

})

const UserSchema = mongoose.model('user',User);
export default UserSchema;