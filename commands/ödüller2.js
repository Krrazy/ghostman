const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "ödüller2",
  description: "🛸 Güncel 2. Ödüllere Bakarsın!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const embed = new EmbedBuilder()
    .setTitle("<a:ghost_tada:1150816488878506077> Rewards - Ödüller 2 Kategorisi <a:ghost_tada:1150816488878506077>")
    .setDescription("<a:ghost_tada:1150816488878506077> **Sunucu Satış** <a:ghost_down:1158471295302901861>  \n <:ghost_minicon:1158471439721173014> `Sunucu Satış Hakkında Bilgi Alırsınız!`\n\n <a:ghost_tada:1150816488878506077> **Genel Ödüller** <a:ghost_down:1158471295302901861>\n <:ghost_minicon:1158471439721173014> `Ana Ödüller Hakkında Bilgi Alırsınız!`⠀⠀⠀⠀⠀\n\n<a:ghost_tada:1150816488878506077> **Code Ödül** <a:ghost_down:1158471295302901861> \n<:ghost_minicon:1158471439721173014> `Bot Altyapıları Vb Coderlar İçin.`\n\n<a:ghost_tada:1150816488878506077> **Hesaplar** <a:ghost_down:1158471295302901861> \n<:ghost_minicon:1158471439721173014> `Netflix Disney Vb Hesaplar İçin Destek Alırsınız!`\n\n<a:ghost_tada:1150816488878506077> **Random Hesaplar** <a:ghost_down:1158471295302901861> \n<:ghost_minicon:1158471439721173014> n`Her Şeyin Random Versiyonu.`")
    .setColor("Random")
    const row = new Discord.ActionRowBuilder()
    .addComponents(
new Discord.ButtonBuilder()
.setEmoji("1156703147314651146")
.setLabel("Sunucu Satış")
.setDisabled(false)
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("swsatıs"),
new Discord.ButtonBuilder()
.setLabel("Ortaklık ( Pazar )")
.setStyle(Discord.ButtonStyle.Secondary)
.setDisabled(true)
.setCustomId("ortak")
.setEmoji("1156703299639189594"),
new Discord.ButtonBuilder()
.setLabel("Şartız Ödül ( Pazar )")
.setStyle(Discord.ButtonStyle.Secondary)
.setDisabled(true)
.setCustomId("sa3")
.setEmoji("1156703512688853103"),
new Discord.ButtonBuilder()
.setLabel("Sunucu Kur ( Pazar )")
.setStyle(Discord.ButtonStyle.Secondary)
.setDisabled(true)
.setCustomId("sa4")
.setEmoji("1156703800363581462"),
new Discord.ButtonBuilder()
.setEmoji("1156683579670151249")
.setLabel("Owner Ol ( Pazar )")
.setDisabled(true)
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("sa5"))
interaction.reply({embeds: [embed], components: [row], ephemeral: true})
  }

};
