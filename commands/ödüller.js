const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "ödüller",
  description: "🛸 Güncel Ödüllere Bakarsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const embed = new EmbedBuilder()
    .setTitle("<a:ghost_parlak:1158470957078429808> Rewards - Ödüller Kategorisi <a:ghost_parlak:1158470957078429808>")
    .setDescription("<a:ghost_tada:1150816488878506077> **Discord Market** <a:ghost_down:1158471295302901861>\n <:ghost_minicon:1158471439721173014>  `Market Hakkında Bilgi Alırsınız!`\n\n <a:ghost_tada:1150816488878506077> **Genel Ödüller** <a:ghost_down:1158471295302901861>\n <:ghost_minicon:1158471439721173014> `Ana Ödüller Hakkında Bilgi Alırsınız!`⠀⠀⠀⠀⠀\n\n<a:ghost_tada:1150816488878506077> **Code Ödül** <a:ghost_down:1158471295302901861> \n<:ghost_minicon:1158471439721173014> `Bot Altyapıları Vb Coderlar İçin.`\n\n<a:ghost_tada:1150816488878506077> **Hesaplar** <a:ghost_down:1158471295302901861> \n<:ghost_minicon:1158471439721173014> `Netflix Disney Vb Hesaplar İçin Destek Alırsınız!`\n\n<a:ghost_tada:1150816488878506077> **Random Hesaplar** <a:ghost_down:1158471295302901861> \n<:ghost_minicon:1158471439721173014> `Her Şeyin Random Versiyonu.` ")
    .setColor("Random")
    const row = new Discord.ActionRowBuilder()
    .addComponents(
new Discord.ButtonBuilder()
.setEmoji("1150817495582777536")
.setLabel("Discord Market")
.setDisabled(false)
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("satıs"),
new Discord.ButtonBuilder()
.setLabel("Genel Ödüller")
.setStyle(Discord.ButtonStyle.Secondary)
.setDisabled(false)
.setCustomId("moderasyon")
.setEmoji("1146169985669009450"),
new Discord.ButtonBuilder()
.setLabel("Code Ödül")
.setStyle(Discord.ButtonStyle.Secondary)
.setDisabled(false)
.setCustomId("kayıt")
.setEmoji("1146169336931815465"),
new Discord.ButtonBuilder()
.setLabel("Random Ödül")
.setStyle(Discord.ButtonStyle.Secondary)
.setDisabled(false)
.setCustomId("random")
.setEmoji("1146172044115984405"),
new Discord.ButtonBuilder()
.setEmoji("1146168692615426078")
.setLabel("Hesaplar")
.setDisabled(false)
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("kullanıcı"))
interaction.reply({embeds: [embed], components: [row], ephemeral: true})
  }

};
