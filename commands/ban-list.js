const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ban-list",
  description: "🛸 Banlı Olan Kullanıcıları Görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    var userlist = interaction.guild.bans.fetch()
    userlist.then(collection => {
    if(collection.first() == null){
      
    const embed = new EmbedBuilder()
    .setDescription("Sunucunuzda Banlanan Kimse Yok!")      
    .setColor("Red")
    .setTitle("<a:ghost_no:1151244046359080960> Hata!")
    interaction.reply({embeds: [embed]})
      
    } else {
    const data = collection.map(mr => "`"+mr.user.username+"`\n").slice(0, 60).join("")
    const embed2 = new EmbedBuilder()
    .setTitle("<a:ghost_ban:1153070175780876289> Ghost - Ban List <a:ghost_ban:1153070175780876289>")
    .setColor("#ff0000")
    .setDescription(data)
    interaction.reply({embeds: [embed2]})
}

  })
}

};
