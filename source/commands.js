//Alec Martens
//This file contains code for general commands

function helpCmd(msg) {
    const helpEmbed = {
          title: 'DataBot Help',
          author: {
              name: 'Alec Martens, am400316@ohio.edu',
              icon_url: 'https://i.imgur.com/J299yIN.jpg',
        },
        description: 'List of commands and thier uses: ',
        thumbnail: {
          url: 'https://i.imgur.com/J299yIN.jpg',
        },
        fields: [
          {
            name: '#help',
            value: 'Gives a list of commands and their uses.',
          },
          //{
            //name: '#ping',
            //value: 'Gives the latency of sending a message',
          //},
          {
            name: '#flip',
            value: 'Flips a coin',
          },
          {
            name: '#roll',
            value: 'Rolls a 6-sided die',
          },
          //{
            //name: '#reset',
            //value: 'Resets all values in database',
          //},
          {
            name: '#8ball <question>',
            value: 'Ask it a question and get an 8ball response',
          },
          {
            name: '#covid <country name>, global',
            value: 'Gives coronavirus statistics',
          },
          {
            name: '#joke (yomama, chuck)',
            value: 'Tells a joke',
          },
          {
            name: '#name (boy, girl, all)',
            value: 'Gives a random name',
          },
          {
            name: '#tbone moment',
            value: 'Gives a random tbone moment',
          },
          {
            name: '#xp',
            value: 'Gives personal XP and level information'
          }
        ],
        footer: {
          text: 'Thank you for using DataBot!',
        },
    };
    msg.channel.send({embed: helpEmbed});
};

function pingCmd(msg) {
    const timeTaken = Date.now() - msg.createdTimestamp; //Calculates latency from (current time) - (time message was sent)
    const pingEmbed = {
      author: {
        name: 'DataBot',
      },
      fields: [
        {
          name: ':ping_pong: PONG! :ping_pong:',
          value: 'This message has a latency of ' + timeTaken + ' ms.',
        },
      ],
      footer: {
        text: 'thank you for pinging',
      },
    }
    msg.channel.send({embed: pingEmbed});
};

function flipCmd(msg, db) {
    var flipresult = Math.round(Math.random()); //O or 1
    var str; //string for heads or tails
    db.query("INSERT INTO coin_flips (result) VALUES (?)", flipresult, function(err, result, fields) {
      if (err) throw err;
      if (flipresult == 0) {
        str = 'Heads'; //0 = heads
      }
      else if (flipresult == 1) {
        str = 'Tails' //1 = tails
      }
    const flipEmbed = {
        author: {
            name: 'DataBot',
          },
        fields: [
          {
            name: ' Your coin flip is: ',
            value: ':coin: ' + str + ' :coin:',
          },
        ],
        footer: {
          text: 'thank you for flipping',
        },
    }
    msg.channel.send({embed: flipEmbed});
})
};

function rollCmd(msg, db) {
    var rollresult = Math.ceil(Math.random() * 6);
    db.query("INSERT INTO dice_rolls (result) VALUES (?)", rollresult, function(err, result, fields) {
      if (err) throw err;
      const rollEmbed = {
        author: {
          name: 'DataBot'
        },
        fields: [
          {
            name: ' Your dice roll is: ',
            value: ':game_die: ' + rollresult + ' :game_die:',
          },
        ],
        footer: {
          text: 'thank you for rolling',
        },
      }
    msg.channel.send({embed: rollEmbed});
})
}

function resetCmd(msg, db) {
    db.query("DELETE FROM coin_flips");
    db.query("DELETE FROM dice_rolls");
    msg.channel.send(':loud_sound: RECORDS CLEARED :loud_sound:');
}

function eightballCmd(msg, db, args) {
    if (args == '') {
        msg.reply('Please ask the 8 ball a question!');
        return;
      }
      else { 
        var myId = Math.floor(Math.random() * 20) + 1 //gets a random id between 1-20
        db.query("SELECT answer FROM 8ball WHERE id = ?", myId, function(err, result) {
            if (err) throw err;
            var str = result[0].answer
            const eightballEmbed = {
              fields: [
                {
                  name: 'The Magic 8Ball Responds!',
                  value: ':8ball: ' + str + ' :8ball:',
                },
              ],
              footer: {
                text: 'thank you for asking the 8ball',
              },
            }
            msg.reply({embed: eightballEmbed});
        });
        }
}

//module exports
module.exports = { helpCmd, pingCmd, flipCmd, rollCmd, resetCmd, eightballCmd };