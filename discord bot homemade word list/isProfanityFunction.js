const { clientId, guildId, token } = require('./strings.json');
const { Client, Collection, Intents } = require('discord.js');
const { Permissions } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

async function isProfanity(msg, serverLibrary) { 
	let res = false; let input = msg.content;

	const removeRepeats = (str) => [...new Set(str)].join('');
	
	if (msg.author.id !== '986412902250594324') {
		for (let i = 0; i < serverLibrary.length; i++) {
			input = msg.content;

			if (input.includes(serverLibrary[i])) {
				res = true;
				break;
			}

			else {
				input = input.replace(/[^a-zA-Z]/g, '');
				input = input.toLowerCase();

				if (input.includes(serverLibrary[i])) {
					res = true;
					break;
				}

				else {
					if (removeRepeats(input).includes(serverLibrary[i])) {
						res = true;
						break;
					}
				}
			}
		}
	}
	
	if (res) {
		deleteMessage(msg);
	}

}

function deleteMessage(msg) {
	if (msg.guild.id == '753072198801031239') { //Neon Tokyo Town
		if (msg.channel.id == '1008577449992396872' && msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			msg.delete();
		}
	}
	
	else if (msg.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
		msg.delete();
	}

	else {
		msg.reply('This message contains a profanity but I am unable to delete it; please enable the "Manage Messages" permission');
	}

}

module.exports = {
    isProfanity,
}
