const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"ban",
    description: '🛸 Belirtilen kullanıcıyı banlarsın.',
    type:1,
    dm_permission: 0,
    options: [
        {
            name:"kullanıcı",
            description:"Yasaklanıcak Kullanıcıyı Seçin.",
            type:6,
            required:true
        },
        {
            name:"sebep",
            description:"Hangi Sebepten dolayı yasaklanıcak?",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {
const simdikiZaman = new Date();
const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const gun = simdikiZaman.getDate();
const ay = simdikiZaman.getMonth();
const yil = simdikiZaman.getFullYear();
const haftaninGunu = simdikiZaman.getDay();
const tarih = `${gun} ${aylar[ay]} ${yil} ${gunler[haftaninGunu]}`;
const saat = simdikiZaman.getHours();
const dakika = simdikiZaman.getMinutes();
const zaman = `${saat}:${dakika < 10 ? '0' : ''}${dakika}`;
const tamZaman = `${tarih} ${zaman}`;

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.user.send({content: "<a:ghost_no:1156683548678434946> **Üyeleri Yasakla Yetkin Yok!**", ephemeral: true})
    const user = interaction.options.getMember('kullanıcı')
    const sebep = interaction.options.getString('sebep')
    if(user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.user.send({content:"<a:ghost_no:1156683548678434946> **Kullanıcının Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.** ",ephemeral:true})
    user.ban({reason: `${sebep} | ${interaction.user.username} | ${tamZaman} `});
    const basariEmbed = new EmbedBuilder()
    .setTitle("Başarılı")
    .setDescription(`<a:ghost_yes:1156683590881521705> **|** ${user} başarıyla **${sebep}** sebebinden __yasaklandı__`)
    .setAuthor({ name: `${user.user.tag}`, iconURL: `${user.user.displayAvatarURL()}` })
    .setThumbnail("https://media.tenor.com/BnIbwX4ZGYwAAAAC/thor-ban.gif")
    interaction.reply({embeds: [basariEmbed]})
}

};