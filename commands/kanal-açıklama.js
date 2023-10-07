const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  name: "kanal-açıklama",
  description: "🛸 Kanal Açıklamasını Değiştirsin!",
  type: 1,
  options: [
    {
        name:"kanal",
        description:"Açıklaması Değiştirilicek Kanalı Ayarlarsın!",
        type:7,
        required:true,
        channel_types:[0]
    },
    {
        name:"açıklama",
        description:"Kanal Açıklamasını Girin!",
        type:3,
        required:true
    },
    
],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "<a:ghost_no:1151244046359080960>  | Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const aciklama = interaction.options.getString('açıklama')
    const kanal2 = interaction.options.getChannel('kanal')
    client.channels.cache.get(kanal2.id).setTopic(aciklama)
interaction.reply("<a:ghost_yes:1151244200873054238>| <#"+kanal2+"> Kanalının Açıklaması Başarıyla **"+aciklama+"** Olarak Değiştirildi.")

  }

};
