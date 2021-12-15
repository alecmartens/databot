//Alec Martens
//This code contains code for covid commands

//require statements
const fetch = require('node-fetch');

//consts
const worlddb = 'https://disease.sh/v2/all?yesterday'; //database that has coronavirus information for the entire world.
const countrydb = 'https://disease.sh/v2/countries?yesterday%20=%20False%20&sort'; //database that has coronavirus information for individual countries.

//functions passed to index.js
function covidCmd(msg, args, avail_countries) { 
    if (args == "global") { global(msg); }
    else if (args == "") { return; }
    else {
      var name = args[0].toUpperCase();
      var normal_names = args[0].toLowerCase().split(" ");
      for (var i = 0; i < normal_names.length; i++) {
      normal_names[i] = normal_names[i][0].toUpperCase()+normal_names[i].substring(1)
    };
    var name1 = normal_names.join(" ");
    if (avail_countries.includes(name1)){ country(msg, name1); }
    else if (avail_countries.includes(name)){ country(msg, name); }
    //else{ msg.reply("Invalid Request. Use #help"); }
    }
  }

//All exported modules above this line
  module.exports = { covidCmd };

//helper functions
function addCommas(num) {//stats
    var result = [];
    var data = num.toString().split("");
    while (data.length >= 4){
      result.push(data.slice(-3))
      data = data.slice(0,-3)
    }
    result.push(data);
    for (var i = 0; i < result.length; i++) {
      result[i] = result[i].join("")
    }
    return result.reverse().join(",")
  };

async function global(msg){
    var stats = await fetch(worlddb);
    var world_stats = await stats.json();
    msg.reply({embed: {
      title: 'Global Coronavirus Information',
      description: 'Updated every 10 minutes.',
      url: 'https://disease.sh/',
      thumbnail: {
        url: 'https://i.imgur.com/JcFZN04.jpg'
      },
      fields: [
        { name: 'World population: ', value: addCommas(world_stats.population), },
        { name: 'Cases: ', value: addCommas(world_stats.cases), },
        { name: 'Today\'s cases: ', value: addCommas( world_stats.todayCases), },
        { name: 'Deaths: ', value: addCommas(world_stats.deaths), },
        { name: 'Today\'s deaths: ', value:addCommas( world_stats.todayDeaths), },
        { name: 'Cases recovered: ', value: addCommas(world_stats.recovered), },
        { name: 'Cases recovered today: ', value: addCommas(world_stats.todayRecovered), },
        { name: 'Cases active: ', value: addCommas(world_stats.active), },
        { name: 'Cases in critical: ', value: addCommas(world_stats.critical), },
        { name: 'Cases per one million: ', value: addCommas(world_stats.casesPerOneMillion), },
        { name: 'Deaths per one million: ', value: world_stats.deathsPerOneMillion, },
        { name: 'Tests: ', value: addCommas(world_stats.tests), },
        { name: 'Tests per one million: ', value: world_stats.testsPerOneMillion, },  
        { name: 'Cases active per one million: ', value: world_stats.activePerOneMillion, },
        { name: 'Cases recovered per one million: ', value: world_stats.recoveredPerOneMillion },
        { name: 'Cases in critical per one million: ', value: world_stats.criticalPerOneMillion, },
        { name: 'Countries affected: ', value: addCommas(world_stats.affectedCountries), },
      ],
      footer: {
        text: 'thank you for viewing data on coronavirus.',
      },
    }})
  }

async function country(msg, name) {
    var stats = await fetch(countrydb);
    var country_json = await stats.json()
    for (var i = 0; i != country_json.length; i++) {
      if (country_json[i].country == name){
        var country = country_json[i];
        msg.reply({embed: {
          title: 'Coronavirus Information for ' + name,
          description: 'Updated every 10 minutes.',
          url: 'https://disease.sh/v2/all?yesterday',
          thumbnail: {
            url: country.countryInfo.flag
          },
          fields: [
            { name: 'Country name: ', value: country.country, },
            { name: 'Continent: ', value: country.continent, },
            { name: 'Cases: ', value: addCommas(country.cases), },
            { name: 'Today\'s cases: ', value: addCommas(country.todayCases), },
            { name: 'Deaths: ', value: addCommas(country.deaths), },
            { name: 'Today\'s deaths: ', value:addCommas(country.todayDeaths), },
            { name: 'Cases recovered: ', value: addCommas(country.recovered), },
            { name: 'Cases recovered today: ', value: addCommas(country.todayRecovered), },
            { name: 'Cases active: ', value: addCommas(country.active), },
            { name: 'Cases in critical: ', value: addCommas(country.critical), },
          ]
        }})
      }
    }
  }


