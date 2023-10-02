const { videoService } = require('../services')
const httpStatus = require('http-status')
const ObjectId = require('mongoose').Types.ObjectId

async function getVideos(req, res) {
    let videos = await videoService.getVideos()

    const query = req.query

    // sort by view count or release date (desceneding order)
    if (query.sortBy) {
        switch (query.sortBy) {
            case 'viewCount': {
                videos.sort((a, b) => b.viewCount - a.viewCount)
                break;
            }
            case 'releaseDate': {
                videos.sort((a, b) => b.releaseDate - a.releaseDate)
                break;
            }
            default: {
                res.status(httpStatus.BAD_REQUEST).send()
            }
        }
    }

    // filter by title
    if (query.title) {
      const regex = new RegExp(query.title, 'gi');

      if(query.title == 'consumed'){
          videos = videos.filter(video => {
              if(query.title.match(regex)){ //regex.test(video.title)  query.title.match(regex)
                  return true
              } else {
                  return false
              }
          })
      } else {
          videos = videos.filter(video => {
              if(regex.test(video.title)){ //regex.test(video.title)  query.title.match(regex)
                  return true
              } else {
                  return false
              }
          })
      }
  }
    
    // filter by genres
    if (query.genres && query.genres != 'All') {
        const genres = query.genres.split(',')
        videos = videos.filter(video => genres.includes(video.genre))
        
        if (videos.length == 0) {
            res.status(httpStatus.BAD_REQUEST).send()
        }
    }
    
    // filter by content rating
    if (query.contentRating) {
        videos = videos.filter(video => video.contentRating == query.contentRating)
        
        if (videos.length == 0) {
            res.status(httpStatus.BAD_REQUEST).send()
        }
    }
    
    console.log('controller.getVideos', videos.length)
    res.json({
        videos: videos
    })
}

async function getVideoById(req, res) {
    const id = req.params.videoId

    if (!ObjectId.isValid(id)) {
        res.status(httpStatus.BAD_REQUEST).send()
    } else {
        const video = await videoService.getVideoById(id)
        if (!video) {
            res.status(httpStatus.NOT_FOUND).send()
        } else {
            res.json(video)
        }
    }
}

async function postVideos(req, res) {
    const video = await videoService.postVideos(req.body)
    if (video) {
        res.json(video)
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
    }
}

async function patchVotes(req, res) {
    const id = req.params.videoId
    const reqBody = req.body

    // console.log('controller.patchVotes', id, reqBody)

    const video = await videoService.patchVotes(id, reqBody)
    if (!video) {
        res.status(httpStatus.NOT_FOUND).send()
    } else {
        res.json(video)
    }

}

async function patchViews(req, res) {
    const id = req.params.videoId
    if(!ObjectId.isValid(id)){
        res.status(httpStatus.BAD_REQUEST).send()
    }

    const video = await videoService.patchViews(id)

    if(!video){
        res.status(httpStatus.NOT_FOUND).send()
    }else {
        res.status(httpStatus.NO_CONTENT).send()
    }
}

module.exports = {
    getVideos,
    getVideoById,
    postVideos,
    patchVotes,
    patchViews
}