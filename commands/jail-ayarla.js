const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
module.exports = {
    name: "jail-ayarla",
    description: '🛸 Jail sistemini ayarlarsın.',
    type: 1,
    dm_permission: 0,
    options: [
        {
            name: "jail-rolü",
            description: "Kullanıcılar jaile alınınca hangi rol verilsin?",
            type: 8,
            required: true
        },
    ],
    run: async (client, interaction) => {
const Discord = require("discord.js")
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
            const hataEmbed = new EmbedBuilder()
            return interaction.user.send({ content: "Jail rolü ayarlamak için `Yönetici` yetkisine sahip olmalısın.", ephemeral: true })
          }
       

          const jailRol = interaction.options.getRole("jail-rolü")

          db.set(`jailRol_${interaction.guild.id}`, jailRol.id)

          const onayEmbed = new EmbedBuilder()
          .setTitle("Başarılı")
          .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
          .setDescription("<a:ghost_yes:1151244200873054238> **|** Jail Rolü Başarıyla Ayarlandı")
          interaction.reply({embeds: [onayEmbed]})

    }
}