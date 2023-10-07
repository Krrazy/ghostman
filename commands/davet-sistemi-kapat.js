const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
module.exports = {
    name: "davet-log-kapat",
    description: '🛸 Davet log sistemini kapatırsın.',
    type: 1,
    dm_permission: 0,
    options: [],
    run: async (client, interaction) => {

        const hataEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<a:ghost_no:1151244046359080960> | Davet sistemini ayarlayabilmek için `Yönetici` yetkisine sahip olmalısın!")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.user.send({ embeds: [hataEmbed], ephemeral: true })

        const zatenSifirlanmis = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Sunucunuzda ayarlı davet sistemi bulunamadı")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })

        if (!db.get(`davetLog_${interaction.guild.id}`)) return interaction.reply({ embeds: [zatenSifirlanmis], ephemeral: true })

        const deleted_embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${interaction.user.username} tarafından`, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`> Davet log sistemi başarıyla sıfırlandı! <a:ghost_yes:1151244200873054238>`)
            .setThumbnail(interaction.user.displayAvatarURL())

        db.delete(`davetLog_${interaction.guild.id}`)
        return interaction.reply({ embeds: [deleted_embed] })
    }
}