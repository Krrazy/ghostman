const Discord = require("discord.js")
const db = require("croxydb");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "ticket-kapat",
  description: "🛸 Ticket sistemini devre dışı bırakırsın.",
  type: 1,
  dm_permission: 0,
  options: [],
  run: async (client, interaction) => {

    if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
      const hataEmbed = new EmbedBuilder()
      return interaction.followUp({ content: "Ticket sistemini ayarlamak için `Yönetici` yetkisine sahip olmalısın.", ephemeral: true })
    }

    const ayarla = db.get(`ticketSistem_${interaction.guild.id}`)
    const { user, customId, guild } = interaction;

            const hataEmbed = new EmbedBuilder()
            .setAuthor({name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})

            .setDescription("<a:ghost_no:1151244046359080960> **|** **Ticket sistemi ayarlı değil.**")


            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })

            if (!ayarla) return interaction.reply({ embeds: [hataEmbed], ephemeral: true })

    db.delete(`ticketKatagor_${guild.id}`)
    db.delete(`ticketSistem_${guild.id}`)

    const embed = new EmbedBuilder()
    .setAuthor({name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
    .setDescription("<a:ghost_yes:1151244200873054238>  **|** Ticket sistemi başarıyla de-aktif edildi")
    .setFooter({text: "Ghost?"})

    interaction.reply({embeds: [embed]})
  }
}