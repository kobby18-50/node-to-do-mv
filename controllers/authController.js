import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import BadRequestError from '../errors/bad-request.js'
import UnauthorizedError from '../errors/unauthorised.js'


const register = async (req,res) => {
   
    const user = await User.create({...req.body})
    const token = user.createJWT()
    const username = user.getName()


    res.status(StatusCodes.CREATED).json({username, token})
}

const login = async (req,res) => {

    const {email, password } = req.body

    if(!email && !password){
        throw new BadRequestError('Email and Password cannot be empty')
    }

    if(!email){
        throw new BadRequestError('Email cannot be empty')
    }

    if(!password){
        throw new BadRequestError('Password cannot be empty')
    }

    const user = await User.findOne({email})

    if(!user){
        throw new UnauthorizedError('User not found')
    }

    // compare password
    const comparePassword = await user.comparePassword(password)

    if(!comparePassword){
        throw new BadRequestError('Invalid credentials')
    }

    // token
    const token = user.createJWT()


    

    res.status(StatusCodes.ACCEPTED).json({
       user :  {
        name : user.getName()
       },
       token
    })
}

export {register,login}