
const express = require('express')
const {videoController} = require('../../controllers/')

const router = express.Router()

router.get('/', videoController.getVideos)

router.get('/:videoId', videoController.getVideoById)

router.post('/', videoController.postVideos)

router.patch('/:videoId/votes', videoController.patchVotes)

router.patch('/:videoId/views', videoController.patchViews)

module.exports = router