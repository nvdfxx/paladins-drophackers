import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    Entry_Datetime: {
        type: String,
        required: true
    },
    Match: {
        type: String,
        required: true,
        unique: true
    },
    Match_Details: [{
        type: Schema.Types.ObjectId,
        ref: 'match_details'
    }],
}, {collection: 'matches'})

export default mongoose.model("match", matchSchema);