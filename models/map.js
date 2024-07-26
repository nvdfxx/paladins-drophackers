import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const schema = new Schema({
    Alias: {
        type: String
    },
    Name: {
        type: String
    },
    Name_English: {
        type: String,
        required: true,
        unique: true
    },
    Image: {
        type: String,
        default: ''
    }
})

export default mongoose.model("map", schema);