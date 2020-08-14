const express = require('express');
const router = express.Router();

const JackConroller = require('./../../controllers/JackConroller');
const PlayersController = require('../../controllers/PlayersController');

router.use('/start/game', JackConroller.startGame )
router.use('/player/move', PlayersController.playerMove )
router.use('/get/moves',PlayersController.getPlayerMoves )
router.use('/dealer/move', PlayersController.dealerMove )


module.exports = router;