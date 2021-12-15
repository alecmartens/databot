//Alec Martens
//am400316@ohio.edu
//12/2/2020

require('dotenv').config();

const fetch = require('node-fetch');
const {Client} = require("discord.js"); 
const client = new Client(); //creates new discord client

const worlddb = 'https://disease.sh/v2/all?yesterday'; //database that has coronavirus information for the entire world.
const countrydb = 'https://disease.sh/v2/countries?yesterday%20=%20False%20&sort'; //database that has coronavirus information for individual countries.
const avail_countries = [];

//get the list of countries that have stats available
async function getCountries(){
  const countries = await fetch(countrydb);
  const all_in_json = await countries.json();
  for (var i = 0; i < all_in_json.length; i++) {
    avail_countries.push(all_in_json[i].country)
  }
};

client.login(process.env.BOT_TOKEN);//logs into bot using token in .env

const prefix = "#";//# is the prefix used before commands

//connect to SQL database
var mysql = require('mysql');
var express = require('express');
var app = express();
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "databot"
});

db.connect(err => {
  if(err) {
    throw err
  }
  console.log('Connected to MySQL Database');
});

function getExp(min, max) {
  exp = Math.floor(Math.random() * (max - min + 1) + min);
  return exp;
}

client.on('ready', () => {
  console.log('Logged in as DataBot');
  getCountries();
})

client.on("message", function(message) {
  if (message.author.bot) return; //checks if message was sent by a bot
  //if (!message.content.startsWith(prefix)) return;
  
  if (message.toString()[0] !== prefix) { //if the message doesnt start with teh prefix it counts towards xp
    
    db.query(`SELECT * FROM experience WHERE id = ${message.author.id}`, (err, rows) => { //update experience values
      if  (err) throw err;
      let sql;
      let newExp;

      if(rows.length < 1) {
        sql = `INSERT INTO experience (id, exp) VALUES ('${message.author.id}', ${getExp(5, 25)})`;//inserts new value into experience
      }
      else {
        const exp = rows[0].exp;//gets experience value
        newExp = exp + getExp(5,25);//calculates new experience value
        sql = `UPDATE experience SET exp =  ${newExp} WHERE id = '${message.author.id}'`;
      }
      db.query(sql);
  });
}
  
  const commandBody = message.content.slice(prefix.length); //removes # prefix
  const args = commandBody.split(' '); //splits the command into substrings
  const command = args.shift().toLowerCase(); //takes the first substring which is the actual command and makes it lowercase.

  getCountries();
  resetDB();
  commandHandler(command, message, args, commandBody);
});

function resetDB() {
  db.query("DELETE FROM coin_flips");
  db.query("DELETE FROM dice_rolls");
}

function commandHandler(myCommand, myMessage, myArgs, myCommandBody) {
  const commands = require('./commands');
  const covid_commands = require('./covid');
  const joke_commands = require('./joke');
  const name_commands = require('./random_name');
  const exp_commands = require('./exp');
  const tbone_commands = require('./tbone');
  if (myCommand == "help") { commands.helpCmd(myMessage); }

  if (myCommand == "ping") { commands.pingCmd(myMessage); }
  
  if (myCommand == "flip") { commands.flipCmd(myMessage, db); } 

  if (myCommand == "roll") { commands.rollCmd(myMessage, db); }

  if (myCommand == "reset") { commands.resetCmd(myMessage, db); }

  if(myCommand == "8ball") { commands.eightballCmd(myMessage, db, myArgs); }

  if(myCommand == "covid" || "covid19" || "coronavirus") { covid_commands.covidCmd(myMessage, myArgs, avail_countries); }

  if(myCommand == "joke") { joke_commands.jokeCmd(myMessage, myArgs); }

  if(myCommand == "name") { name_commands.random_nameCmd(myMessage, myArgs); }

  if(myCommand == "exp" || myCommand == "xp") { exp_commands.expCmd(myMessage, myArgs, db); }

  if(myCommand == "tbone") { tbone_commands.tboneCmd(myMessage, myArgs, db); }
}

  

  