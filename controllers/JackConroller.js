const path = require('path').resolve;
const config = require(path('config/constants'));

const messages = require('../common/messages');
const ResponseService = require('../common/response');
const GameService = require('./../services/game')
// I HAD IMPLEMENTED ALL FUNCTIONS IN SINGLE CONTROLLER USUALLY WE GROUP FUNCTION BY PARENT ELEMENT LIKE USER CONTROLLER, ADMIN CONTROLLER


class JackConroller {


    startGame = async (req, res) => {
        try {
        const request = {...req.body}
        let tempDECK = JSON.stringify (this.shuffleDeck(request.decks))
        let sampleData = {
            deck : tempDECK,
            numberOfPlayers : 4,
            moneySpent: 23
        }

        // WE can use bulk create also . But for that we also have to create four data row which will also take a for loop 
        
        var c = await GameService.startGame(sampleData);
        let players = await this.createPlayers(c._id, request.numberOfPlayers, request.moneySpent, tempDECK);
        // console.log(players);
        res.send(ResponseService.success(players));

        }
        catch (err) {
            res.status(err.status || 500).send(ResponseService.failure(err));
        }
    }


    createPlayers = async (gameId, numberOfPlayers, moneySpent , tempDECK) => {
        
        let players  = [];
        let Deck =  JSON.parse(tempDECK)
        let response = []
        
        while (numberOfPlayers >= 0 ){
            let details = {
                gameId : gameId,
                moneySpent : moneySpent,
                isDealer :  numberOfPlayers == 0 ?  true : false 
            }
            let card = Deck.splice(0,1)
            // let t.
            let t = await GameService.createPlayer(details)
            
            let move = await this.playersFirstMove (t._id, gameId,card)
            let temp = await {
                player : t,
                move :move
            }
            
            players.push(temp)
            numberOfPlayers --;
        }

        await GameService.updateGameDeck ({ _id : gameId}, { deck: JSON.stringify (Deck)   } )
        return players

    }


    playersFirstMove = async (playerID,gameId ,card) => {
        let details = {
            gameId: gameId,
            playerId: playerID,
            card: card[0],
            moveType: "Computer"
        }
        return GameService.createMove(details)
    }

    shuffleDeck (numberofDeck) {
        // I am configuring all cards and after that i am shuffling them. 
        let sortedDeck = []
       while (numberofDeck > 0 )
       {
            for (let typess in config.FourNames){
                for (let number = 1 ; number <= 13 ; number++ ){
                    sortedDeck.push (`${config.FourNames[typess]}-${number}`)
                }
            }
        numberofDeck--
    }
        for(let i = sortedDeck.length - 1 ; i > 0 ; i--){
            const j = Math.floor(Math.random() * i)
            const temp = sortedDeck[i]
            sortedDeck[i] = sortedDeck[j]
            sortedDeck[j] = temp
          }


        // console.log(sortedDeck);
        return sortedDeck
    }
    


}

module.exports = new JackConroller;