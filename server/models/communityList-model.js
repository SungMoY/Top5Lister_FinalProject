const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [[String,Number]], required: true },
        likes: {type: [String], required: true},
        dislikes: {type: [String], required: true},
        comments: {type: [[String,String]], required: true},
        updateDate: {type: String, required: true},
        views: {type: Number, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)
