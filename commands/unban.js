const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "unban",
    description: '🛸 Kullanıcının yasağını kaldırırsın.',
    type: 1,
    dm_permission: 0,
    options: [
        {
            name: "id",
            description: "Kullanıcının İD'sini Yazın.",
            type: 3, 
            required: true
        },
    ],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return client.channels.cache.get(interaction.channel.id).send({ content: "Üzgünüm Bunu Yapmaya Yetkin Yetmiyor :(", ephemeral: true });
        }

        const user = interaction.options.getString('id');
        const banlıKullanicilar = await interaction.guild.bans.fetch();

        const checkKullanici = banlıKullanicilar.find(ban => ban.user.id === user);

        if (checkKullanici) {
            await interaction.guild.members.unban(user);

            const basariEmbed = new EmbedBuilder()
                .setTitle("Başarılı")
                .setDescription(`<a:ghost_yes:1151244200873054238> **|** ${checkKullanici.user.tag} kullanıcısının banı __açıldı__`)
                .setAuthor({ name: `${checkKullanici.user.tag}`, iconURL: `${checkKullanici.user.displayAvatarURL()}` });

            interaction.reply({ embeds: [basariEmbed] });
        } else {
            interaction.reply({ content: "Geçersiz bir kullanıcı ID'si girildi veya kullanıcı zaten yasaklı değil.", ephemeral: true });
        }
    }
};
