const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
module.exports = {
    name: "davet-sistemi",
    description:'🛸 Davet sistemini hazır hale getirirsin.',
    type: 1,
    dm_permission: 0,
    options: [
        {
            name: "davet-kanalı",
            description: "Davet mesajlarının gönderileceği kanal.",
            type: 7,
            required: true,
            channel_types: [0]
        },
        {
            name: "mesaj-görünümü",
            description: "Mesajın görünümünü ayarlarsın, hoş bir embed mi yoksa düz mesaj mı!",
            type: 3,
            required: true,
            choices: [
                {
                    name: 'Embed Mesajı',
                    value: "embed"
                },

                {
                    name: 'Normal Mesaj',
                    value: "mesaj"
                },
            ]
        }
    ],
    run: async (client, interaction) => {

        const hataEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setDescription("<a:ghost_no:1151244046359080960> **|** Davet sistemini ayarlayabilmek için `Yönetici` yetkisine sahip olmalısın!")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.user.send({ embeds: [hataEmbed], ephemeral: true })

        const channel = interaction.options.getChannel("davet-kanalı")
        const input = interaction.options.getString("mesaj-görünümü")

        if (input === "embed") {
            const success_embed = new EmbedBuilder()
                .setColor("Green")
                .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setTitle("<a:ghost_yes:1151244200873054238> **|** Başarılı")
                .setDescription(`> Sistem kuruldu.`)
                .setThumbnail(interaction.user.displayAvatarURL())

            db.set(`davetLog_${interaction.guild.id}`, { channel: channel.id, message: input })
            return interaction.reply({ embeds: [success_embed] })
        }

        if (input === "mesaj") {
            const success_embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setTitle("<a:ghost_yes:1151244200873054238> **|** Başarılı")
            .setDescription(`> **Sistem kuruldu.**`)
            .setThumbnail(interaction.user.displayAvatarURL())

            db.set(`davetLog_${interaction.guild.id}`, { channel: channel.id, message: input })
            return interaction.reply({ embeds: [success_embed] })
        }
    }
}