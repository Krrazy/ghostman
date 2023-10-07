const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
module.exports = {
    name: "jail",
    description: '🛸 Kullanıcıyı hapis edersin.',
    type: 1,
    dm_permission: 0,
    options: [
        {
            name: "kullanıcı",
            description: "Hangi kullanıcı jaile alınsın",
            type: 6,
            required: true
        },
    ],
    run: async (client, interaction) => {
        const Discord = require("discord.js");
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
            const hataEmbed = new EmbedBuilder();
            return interaction.user.send({ content: "Birini jaile almak için `Yönetici` yetkisine sahip olmalısın.", ephemeral: true });
        }
        
        const jailRol = interaction.options.getMember("kullanıcı");


        const verilecekRolId = db.get(`jailRol_${interaction.guild.id}`);
        const verilecekRol = interaction.guild.roles.cache.get(verilecekRolId);

        if (!verilecekRol) {
            return interaction.reply("Jail rolü bulunamadı.");
        }

        const eskiRoller = jailRol.roles.cache.map(role => role.id);

        try {
            await jailRol.roles.set([verilecekRol]);
            
            const onayEmbed = new EmbedBuilder()
                .setTitle("Başarılı")
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                .setDescription("<a:ghost_yes:1151244200873054238> **|** Başarıyla Kullanıcıyı jaile aldım");
            await interaction.reply({embeds: [onayEmbed]});
            


        } catch (error) {
            console.error("Rol verme veya alma hatası:", error);
            interaction.reply("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }
};
