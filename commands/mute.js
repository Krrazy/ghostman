const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const ms = require("ms")
const Discord = require("discord.js")


module.exports = {
    name: "mute",
    dm_permission: 0,
    description: "🛸 Kullanıcıyı belirttiğin süre boyunca susturursun.",
    options: [
        {
            type: 6,
            name: "kullanıcı",
            description: "Kimi susturmamı istersin?",
            required: true
        },
        {
            type: 3,
            name: "süre",
            description: "Ne kadar? 1m, 1h, 1d gibi bir süre belirt.",
            required: true
        },
        {
            type: 3,
            name: "sebep",
            description: "Üyeye neden mute atıyorsun?",
            required: true
        }
    ],
    type: 1,

    run: async (client, interaction) => {

        

        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
            const hataEmbed = new EmbedBuilder()
            return client.channels.cache.get(interaction.channel.id).send({ content: "Mute atmak için `Yönetici` yetkisine sahip olmalısın.", ephemeral: true })
          }

        const botYetki = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bunu yapabilmek için yeterli yetkiye sahip değilim.")


        const pozisyon = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Kullanıcının rolü benim rolümden yüksek.")

        const pozisyon2 = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Kullanıcının rolü senin rolünden yüksek.")

        const gecerliSure = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Susturabilmem için geçerli bir süre girmelisin. 1m 1d gibi.")

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Komutu kullanırken bir hata oluştu.")

        const kullanıcı = interaction.options.getMember("kullanıcı")
        const süre = interaction.options.getString("süre")
        const sebep = interaction.options.getString("sebep")

        //if (!interaction.member.roles.cache.has(yetkili)) return interaction.reply({ embeds: [uyeYetki], ephemeral: true })
        let me = interaction.guild.members.cache.get(client.user.id)
        if (!me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ embeds: [botYetki], ephemeral: true })



        if (interaction.guild.ownerId !== interaction.author) {
            if (kullanıcı.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [pozisyon2], ephemeral: true })
        }

        if (kullanıcı.roles.highest.position >= me.roles.highest.position) return interaction.reply({ embeds: [pozisyon], ephemeral: true })

        const timeout = ms(süre)
        if (!timeout) return interaction.reply({ embeds: [gecerliSure], ephemeral: true })

        await kullanıcı.timeout(timeout).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })
        const logMe = new EmbedBuilder()
            .setColor("Green")
            .setTitle("<a:ghost_yes:1151244200873054238> Bir Üye Susturuldu!")
            .setDescription(`<:ghost_mute:1151246306837286912> <@${interaction.user.id}> adlı yetkili <@${kullanıcı.id}> adlı kişiyi **${süre}** boyunca \`${sebep}\` sebebiyle susturdu!`)
            .setTimestamp()
            .setThumbnail(kullanıcı.displayAvatarURL({ dynamic: true }))



        return interaction.reply({ embeds: [logMe] }).catch((e) => { })

    }
};