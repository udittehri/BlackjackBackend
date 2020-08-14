const path = require('path').resolve;
const config = require(path('config/constants'));
var mongoose = require('mongoose');
const ResponseService = require('../common/response');
const GameService = require('./../services/game');
const game = require('./../services/game');
// I HAD IMPLEMENTED ALL FUNCTIONS IN SINGLE CONTROLLER USUALLY WE GROUP FUNCTION BY PARENT ELEMENT LIKE USER CONTROLLER, ADMIN CONTROLLER

class PlayersController {

    playerMove = async (req, res) => {
        try {
            const request = { ...req.body }
            let game = await GameService.getGame({ _id: request.gameId })
            let deck = JSON.parse(game.deck);
            let card = deck.splice(0, 1)
            let details = {
                gameId: request.gameId,
                playerId: request.playerId,
                card: card[0],
                moveType: "Player"
            }
            let i = await GameService.createMove(details)
            if (i) {
                await GameService.updateGameDeck({ _id: request.gameId }, { deck: JSON.stringify(deck) })
            }

            // I AM UNAWARE OF THE GAME. I GOOGLED GAME BUT DIDN'T GET IT. I HAD IMPLEMENTED CHECK FOR BSUTING 
            await this.checkIfBust(request.playerId, request.gameId);
            let player = await GameService.getPlayer({ _id: request.playerId, gameId: request.gameId })
            let response = {
                player: player,
                move: await i
            }
            res.send(ResponseService.success(response));

        }
        catch (err) {
            res.status(err.status || 500).send(ResponseService.failure(err));
        }
    }
    checkIfBust = async (playerId, gameId) => {
        let moves = await GameService.findMoves({ gameId: gameId, playerId: playerId })

        let total = 0
        let Aces = 0
        for (let move of moves) {
            let points = Number(move.card.toString().split('-')[1])
            if (points > 10) total += 10
            else if (points == 1) Aces++
            else total += points
        }
        if (Aces > 1) {
            total += Aces
            if (total > 21) GameService.updatePlayer({ _id: playerId, gameId: gameId }, { imGamee: false })
        }
        else if (Aces == 1 && total + 1 > 21) {
            GameService.updatePlayer({ _id: playerId, gameId: gameId }, { imGamee: false })
        }

        if (total > 21) GameService.updatePlayer({ _id: playerId, gameId: gameId }, { imGamee: false })

        return moves
    };

    getPlayerMoves = async (req, res) => {
        try {
            const request = { ...req.body }
            let crietria = {
                gameId: request.gameId,
                playerId: request.playerId
            }
            let moves = await GameService.findMoves(crietria);
            res.send(ResponseService.success(moves));

        }
        catch (err) {
            res.status(err.status || 500).send(ResponseService.failure(err));
        }
    }

    dealerMove = async (req, res) => {
        try {
            //WE CAN CHECK IF IT IS A DEALER OR NOT HAD NOT VALIDATIONS ANYWHERE WE CAN DO IT LIKE
            // THROW NEW ERROR.VALIDATIONERROR ('DEALER',MESSAGE.DEALER_NOT_VALID)
            
            const request = { ...req.body }
            let game = await GameService.getGame({ _id: request.gameId })
            let deck = JSON.parse(game.deck);
            let card = deck.splice(0, 1)
            let details = {
                gameId: request.gameId,
                playerId: request.playerId,
                card: card[0],
                moveType: "Player"
            }
            let i = await GameService.createMove(details)
            if (i) {
                await GameService.updateGameDeck({ _id: request.gameId }, { deck: JSON.stringify(deck) })
            }
            res.send(ResponseService.success(i));

        }
        catch (err) {
            res.status(err.status || 500).send(ResponseService.failure(err));
        }
    }


}

module.exports = new PlayersController;