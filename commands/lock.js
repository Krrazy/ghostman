const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "lock",
  description: "🛸 Kanalı mesaj gönderilmesine kapatır.!",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<:carpi:1040649840394260510> | Kanalları yönet yetkin yok!", ephemeral: true})
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
      SendMessages: false,
    });
interaction.reply({content: '<a:ghost_yes:1151244200873054238> | `Kanal başarılı bir şekilde mesaj gönderimine kapatıldı!`'})
  }  

};