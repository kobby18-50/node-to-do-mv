import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    createdBy: {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Please provide user']
    },

    title : {
        type : String,
        required : [true, 'Title is required'],
        unique : [true, 'This title has already been used try a different one'],
        minLength : 10
    },

    description : {
        type : String,
        required : [true, 'Description is required'],
        minLength : 20
    },

    status : {
        type : String,
        default : 'pending',
        enum : ['pending', 'completed']
    }
},
{
    timestamps : true
}
)

export default mongoose.model('Task', TaskSchema)