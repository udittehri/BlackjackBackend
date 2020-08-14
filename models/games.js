const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    deck: {
        type: String,
        required: true
    },
    
    numberOfPlayers :{
        type : Number,
        required : true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('games', schema);
