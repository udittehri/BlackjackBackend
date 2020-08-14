const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Games',
        required: true
    },
    name :{
        type: String,
        required: false
    },
    imGamee: {
        type: Boolean,
        default: true,
        required: true
    },
    moneySpent :{
        type : Number,
        required : true
    },
    isDealer:{
        type: Boolean,
        default: false,
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('players', schema);
