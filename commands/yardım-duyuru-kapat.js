const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json")
let botSahip = config.BOTSAHİPİD;
module.exports = {
    name: "yardım-duyuru-sil",
    description: '🛸 Bot yöneticileri yardım komundaki duyuruyu siler.',
    type: 1,
    dm_permission: 0,
    options: [],
    run: async (client, interaction) => {
const Discord = require("discord.js")


const tas = [`${botSahip}`];
const yetkiEmbed = new EmbedBuilder()
.setDescription(`Bunu sadece bot yöneticisi (<@${botSahip}>) kullanabilir`)
.setColor("Red")
if (!tas.includes(interaction.user.id)) return client.channels.cache.get(interaction.channel.id).send({embeds:[yetkiEmbed]})




          db.delete(`yardımDuyuru`)

          const onayEmbed = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription("<a:ghost_yes:1151244200873054238> **|** `Yardım Komutu İçin Duyuru Başarıyla Silindi.`")
          interaction.reply({embeds: [onayEmbed]})

    }
}