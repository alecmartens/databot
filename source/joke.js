//Alec Martens
//This file contains code for covid commands

const axios = require("axios");

function jokeCmd(msg, args) {
    if (args == "yomomma" || args == "yomama") {//yo mama jokes
        axios.get('https://api.yomomma.info/').then(result => {
            msg.reply(result.data.joke);
        })
    }
    else if (args == "chuck") { //chuck norris jokes
        axios.get('https://api.chucknorris.io/jokes/random').then(result => {
            msg.reply(result.data.value);
        })
    }
    /*else if (args == "dad") { //dad jokes
        axios.get('https://icanhazdadjoke.com/').then(result => {
            msg.reply(result.data.joke);
        })
    }*/
    else { msg.reply('Please add a joke command.') }
}

module.exports = { jokeCmd };
