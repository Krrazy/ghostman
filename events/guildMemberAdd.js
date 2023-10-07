const Discord = require("discord.js");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const db = require("croxydb");
const moment = require("moment");

module.exports = {
    name: Discord.Events.GuildMemberAdd,

    run: async(client, member) => {
        const uye = db.fetch(`kayıtlıuye_${member.id}`);

        if (uye) {
            const kayitsistemi = db.fetch(`kayıtsistemi_${member.guild.id}`)
            const kayıtkanal = await member.guild.channels.cache.find(ch => ch.id === kayitsistemi.kayıtkanal);
            const kayıtlırol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtlırol);
            const kayıtsızrol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtsızrol);
            member.setNickname(`Kayıtsız`);
            await member.roles.add(kayıtlırol);
            await member.roles.remove(kayıtsızrol);
			try {
                kayıtkanal.send({
                embeds: [
                    {
                        description: `${member} sunucuya tekrar katıldı ve otomatik olarak kaydı yapıldı!`
                    }
                ],
            });
			} catch(err) { }
        }

                  const kayitsistemi = db.fetch(`kayıtsistemi_${member.guild.id}`)

        if(kayitsistemi) {

            const kayıtkanal = await member.guild.channels.cache.find(ch => ch.id === kayitsistemi.kayıtkanal);
            const kayıtlırol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtlırol);
            const kayıtsızrol = await member.guild.roles.cache.find(rl => rl.id === kayitsistemi.kayıtsızrol);

        member.guild.members.cache.get(member.id).roles.add(kayıtsızrol)
            try {
                kayıtkanal.send({ content: `${member}`, embeds: [
            {
                description: `hg (opsiyonel)`
            }
        ], components: [row] })
    } catch(err) { }

    }
}
}