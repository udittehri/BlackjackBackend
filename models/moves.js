const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Games',
        required: true
    },
    playerId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Players',
        required: true
    },
    card: {
        type: String,
        required: true
    },
    moveType :{
        type: String, // 1- 
        required : true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('moves', schema);
