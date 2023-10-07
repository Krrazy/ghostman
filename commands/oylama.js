const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")
module.exports = {
  name: "oylama",
  description: "Oylama Yaparsın!",
  type: 1,
  options: [
    {
        name:"oylaman",
        description:"Oylama Seçeneğini Gir!",
        type:3,
        required:true
    },
  ],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames)) return interaction.reply({content: "İsimleri Yönet Yetkin Yok!", ephemeral: true})

    const oylama = interaction.options.getString('oylaman')
    const embed = new EmbedBuilder()
    .setTitle("<a:ghost_ates:1150819848100778035> Rewards - Oylama Sistemi! <a:ghost_ates:1150819848100778035>")
    .setDescription(`<a:ghost_sagok:1150815664202862692> Oylama: **${oylama}**`)
    .setColor("Green")
interaction.channel.send({embeds: [embed]}).then((mesaj) => {
interaction.reply({content: "Oylama Başarıyla Oluşturuldu.", ephemeral: true}) 
mesaj.react("1156683590881521705")
mesaj.react("🤷")
mesaj.react("1156683548678434946")


})
  }

};
