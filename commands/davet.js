const { Client, EmbedBuilder, ButtonBuilder, ActionRow } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "davet",
  description: "🛸 Botun davet linkini atar.",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const dvt = new Discord.ButtonBuilder().setLabel('Davet Linkim').setStyle('Link').setEmoji('1150819848100778035').setURL('Link: https://discord.com/oauth2/authorize?client_id=1158130535533645974 &scope=bot&permissions=8');
	const destek = new Discord.ButtonBuilder().setLabel('Destek Sunucum').setStyle('Link').setEmoji('1150819848100778035').setURL('https://discord.gg/aeTvaErkM');
    const row = new Discord.ActionRowBuilder().addComponents(dvt).addComponents(destek)
    const embed = new EmbedBuilder()
    .setAuthor({ name: "Merhaba, Ben Ghost!", iconURL: interaction.client.user.displayAvatarURL({ dynamic: true })})
.setTitle("Ghost'u Davet Et!")
.setDescription(`:ghost: | Ghost'u şimdi sunucuna davet et ve botun tadını çıkar!`)
.setColor('#2F3136')
.setTimestamp()
.setFooter({text: interaction.user.tag+" İstedi.", iconURL: interaction.user.displayAvatarURL({ dynamic: true })})

interaction.reply({ embeds: [embed], components:[row]});
  }  

};