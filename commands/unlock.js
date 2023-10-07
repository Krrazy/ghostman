const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "unlock",
  description: "🛸 Kanalı mesaj gönderimine açar!",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<a:ghost_no:1151244046359080960> | Kanalları yönet yetkin yok!", ephemeral: true})
    interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
      SendMessages: true,
    });
interaction.reply({content: '<a:ghost_yes:1151244200873054238> | `Kanal başarılı bir şekilde mesaj gönderimine açıldı!`'})
  }  

};