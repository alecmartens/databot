//Alec Martens
//This file contains code for a random name generator

const axios = require("axios");

function random_nameCmd(msg, args) {
    if (args == 'boy') {
        axios.get('http://names.drycodes.com/1?nameOptions=boy_names').then(result => {
            msg.reply(result.data);
        })
    }
    else if (args == 'girl') {
        axios.get('http://names.drycodes.com/1?nameOptions=girl_names').then(result => {
            msg.reply(result.data);
        })
    }
    else if (args == 'all') {
        axios.get('http://names.drycodes.com/1').then(result => {
            msg.reply(result.data);
        })
    }
    /*else if (args == 'funny') { //causes an error for some reason
        axios.get('names.drycodes.com/1?nameOptions=funnyWords').then(result => {
            msg.reply(result.data);
        })
    }*/
    else {msg.reply('Please add a random name command.')}
}

module.exports = { random_nameCmd };