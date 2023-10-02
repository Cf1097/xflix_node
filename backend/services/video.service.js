const { Video } = require('../models')

async function getVideos() {
    return await Video.find({})
}

async function getVideoById(id) {
    return await Video.findById(id)
}

async function postVideos(reqBody) {
    // console.log('video.service', reqBody)
    let res = null
    
    if(reqBody.videos){
        res = await Video.insertMany(reqBody.videos)
    }
    else if(reqBody.length){
        res = await Video.insertMany(reqBody)
    }else {
        res = await Video.create(reqBody)
    }
    console.log('postVideos', res)
    return res
}

async function patchVotes(id, reqBody) {
    console.log('service.patchVotes', id, reqBody)

    if (reqBody.vote == 'upVote') {
        if (reqBody.change == 'increase') {
            return await Video.findByIdAndUpdate(
                id,
                { $inc:{ 'votes.upVotes': 1 } },
                { new: true }
            )
        }

        if(reqBody.change == 'decrease'){
            return await Video.findByIdAndUpdate(
                id,
                { $inc:{ 'votes.upVotes': -1 } },
                { new: true }
            )
        }
    }

    if (reqBody.vote == 'downVote') {
        if (reqBody.change == 'increase') {
            return await Video.findByIdAndUpdate(
                id,
                { $inc:{ 'votes.downVotes': 1 } },
                { new: true }
            )
        }

        if(reqBody.change == 'decrease'){
            return await Video.findByIdAndUpdate(
                id,
                { $inc:{ 'votes.downVotes': -1 } },
                { new: true }
            )
        }
    }
}

async function patchViews(id) {
    return await Video.findByIdAndUpdate(
        id,
        {$inc: {viewCount: 1}},
        {new: true}
    )
}

module.exports = {
    getVideos,
    getVideoById,
    postVideos,
    patchVotes,
    patchViews
}