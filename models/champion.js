import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const schema = new Schema({
    ChampionId: {
        type: Number,
        unique: true,
        required: true
    },
    Alias: {
        type: String
    },
    Name: {
        type: String
    },
    Name_English: {
        type: String
    },
    Role: {
        type: String
    },
    ChampionIcon_URL: {
        type: String,
        default: ''
    },
    TotalWinrate: {
        type: Number,
        default: 0
    },
    TotalBanrate: {
        type: Number,
        default: 0
    },
    TotalPickrate: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("champion", schema);