const Game = require('../models/games');
const Player = require('../models/players');
const Moves = require('./../models/moves');


class GameService {

    getGame(detials){
        return Game.findOne(detials) 
    }

    startGame(details) {
        return new Game(details).save();
    }

    updateGameDeck(id,detials){
        return Game.findByIdAndUpdate (id, detials , {new:true})
    }


    getPlayer(details){
        return Player.findOne(details)
    }
    createPlayer(details){
        return new Player(details).save();
    }
    updatePlayer(id,detials){
        return Player.findByIdAndUpdate (id, detials , {new:true})
    }



    createMove (details){
        
        return new Moves(details).save();
    }

    findMoves(details){
        return Moves.find(details)
    }

    // Delete User is To Update User with status Disabled 
}

module.exports = new GameService();