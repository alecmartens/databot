//Alec Martens
//This file conatins code for the experience system of the bot.

function expCmd(msg, args, db) {
    const user = msg.mentions.users.first() || msg.author;
    db.query(`SELECT * FROM experience WHERE id = '${user.id}'`, (err, result) => {
        if (err) throw err;

        if (!result[0]) { //if there is no experience in the database
            return msg.channel.send(`${user.username} has no XP stored.`);
        }
        const levelExp = 100; //xp needed to level up
        let exp = result[0].exp; //initial experience
        let level = Math.floor(exp / levelExp); //level = experience/level experience (rounded down)
        let needXP = (level + 1) * levelExp - exp; //xp needed for next level

        const expEmbed = {
            title: `:star2: ${user.username}'s Experience :star2: `,
            fields : [
                { 
                    name: ':green_circle: Experience Level : ', value: exp, 
                },
                { 
                    name: ':red_circle: Current Level: ', value: level, 
                },
                { 
                    name: ':blue_circle: Experience Needed for  Next Level Up: ', value: needXP, 
                },
            ]
        }
        msg.channel.send({embed: expEmbed});
    });
}

module.exports = {expCmd};