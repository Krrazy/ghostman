const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "yavaş-mod",
  description: "🛸 Kanalın Yavaş Modunu Ayarlarsın!",
  type: 1,
  options: [
    {
        name:"saniye",
        description:"Yavaş Modu Kaç Saniye Yapıcaksın?",
        type:3,
        required:true
    },
   
   
    
],

  run: async(client, interaction) => {
    const ms = require('rhino-ms')
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<a:ghost_no:1151244046359080960> | Kanalları Yönet Yetkin Yok!", ephemeral: true})


    const zaman = interaction.options.getString('saniye')
    if (zaman < 0 || zaman > 21600) return interaction.reply("<a:ghost_no:1151244046359080960> | Süre limiti maksimum **6** saat olabilir.")
    const slowmode = Math.floor(zaman)
    interaction.channel.setRateLimitPerUser(slowmode)

   interaction.reply(`<a:ghost_yes:1151244200873054238> | Yazma süre limiti **${zaman}** saniye olarak ayarlanmıştır.`)


  }

};
