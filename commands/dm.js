const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
module.exports = {
    name: "dm",
    description: '🛸 Sunucuda bulunan herkese DM gönderirsin.',
    type: 1,
    dm_permission: 0,
    options: [
        {
            name: "mesaj",
            description: "Hangi mesaj gönderilsin",
            type: 3,
            required: true
        },
    ],
    run: async (client, interaction) => {
const Discord = require("discord.js")
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
            const hataEmbed = new EmbedBuilder()
            return client.channels.cache.get(interaction.channel.id).send({ content: "Herkese DM atabilmek için `Yönetici` yetkisine sahip olmalısın.", ephemeral: true })
          }
        const mesaj = interaction.options.getString("mesaj")
          interaction.guild.members.cache.forEach(member => {
            member.send(mesaj)
                .catch(error => {
                    console.error(`Hata: ${error.message}`);
                });
        });


        const onayEmbed = new EmbedBuilder()
        .setTitle("Developer By Krrazy")
        .setDescription("<a:ghost_yes:1156683590881521705> Başarılı Şekilde Belirtilen Mesaj Sunucudaki Herkese Atılmaya Başlandı!")
        const msg = interaction.reply({embeds: [onayEmbed]})
        
        setTimeout(() => {
            msg.delete();
        }, 2000);
    }
}