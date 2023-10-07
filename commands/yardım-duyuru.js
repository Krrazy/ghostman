const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
const config = require("../config.json")
let botSahip = config.BOTSAHİPİD;
module.exports = {
    name: "yardım-duyuru",
    description: '🛸 Bot yöneticileri yardım komudu için duyuru ayarlar.',
    type: 1,
    dm_permission: 0,
    options: [
        {
            name: "duyuru",
            description: "Yardım komutundaki duyuru kısmında ne yazsın?",
            type: 3,
            required: true
        },
    ],
    run: async (client, interaction) => {
const Discord = require("discord.js")

const tas = [`${botSahip}`];
const yetkiEmbed = new EmbedBuilder()
.setDescription(`Bunu sadece bot yöneticisi (<@${botSahip}>) kullanabilir`)
.setColor("Red")
if (!tas.includes(interaction.user.id)) return client.channels.cache.get(interaction.channel.id).send({embeds:[yetkiEmbed]})

          const icerik = interaction.options.getString("duyuru")

          db.set(`yardımDuyuru`, icerik)

          const onayEmbed = new EmbedBuilder()
          .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription("<a:ghost_yes:1151244200873054238> **|** `Yardım Komutu İçin Duyuru Başarıyla Değiştirildi.`")
          interaction.reply({embeds: [onayEmbed]})

    }
}