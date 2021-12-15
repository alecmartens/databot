//Alec Martens
//This file contains code for general commands

function tboneCmd(msg, args, db) {
    if (args == '' || args == 'moment') {//send a tbone moment
        db.query("SELECT COUNT(*) FROM tbonemoments", function(err, result) {//gets the amount of rows
            if (err) throw err;
            //var rowCount = JSON.parse(JSON.stringify(result[0]));//JSON.parse(JSON.stringify(result[0].id));
            //console.log(rowCount);
            //var myID = Math.floor(Math.random * rowCount) + 1;//gets a random ID
            //console.log(myID);
            var myID = 2;
            db.query("SELECT moment FROM tbonemoments ORDER BY RAND() LIMIT 1", function(err, result) {
                if (err) throw err;
                var str = result[0].moment
                const tboneEmbed = {
                  fields: [
                    {
                      name: 'The Mystical Tbone Responds!',
                      value: ':shirt:   ' + str + '   :shirt:',
                    },
                  ],
                }
                msg.reply({embed: tboneEmbed});
            });
        });
        
    }
    //else if (args == 'add') {//add a tbone moment to database  
    //}

}

//module exports
module.exports = { tboneCmd };