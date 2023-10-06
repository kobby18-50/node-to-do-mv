
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required : [true, 'Name is required'],
        minLength : 5
    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : [true, 'This email has already been used, try a different one'],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'Please provide a valid email'
        ]
    },


    password : {
        type : String,
        required : [true, 'Password is required'],
        minLength : 8
    }
})

// hashing password before saving
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// generating token
UserSchema.methods.createJWT = function(){
    const token = jwt.sign({userId : this._id, name : this.name}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_LIFETIME})
    return token
}

// get User name
UserSchema.methods.getName = function(){
    return this.name
}

// comparing passwords for user login
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


export default mongoose.model('User', UserSchema)