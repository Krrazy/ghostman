const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıt-et",
    description: '🛸 Kayıtlı rol ayarlarsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Kayıt ediceğin kullanıcıyı etiketle!",
            type:6,
            required:true
        }
    ],
  run: async(client, interaction) => {

  if (interaction.member.roles.cache.has("1150422651559493662")) {
    interaction.reply({content: "<a:ghost_yes:1151244200873054238> **Başarıyla Belirlenen Kullanıcıyı** `Kayıt Ettim!`"})
}
    const user = interaction.options.getMember('user')
let kayıtlı = db.fetch(`kayıtlı_${interaction.guild.id}`)
let kayıtsız = db.fetch(`kayıtsız_${interaction.guild.id}`)
if (!kayıtlı) return interaction.reply("Kayıtlı rolü ayarlanmamış!")
interaction.guild.members.cache.get(user.id).roles.add(kayıtlı)
interaction.guild.members.cache.get(user.id).roles.remove(kayıtsız)

    interaction.reply({content: `<a:ghost_yes:1151244200873054238> **Başarıyla** ${user} **Kullanıcısını Kayıt Ettim!**`})
}

};