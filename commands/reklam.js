const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
module.exports = {
  name: "reklam",
  description: "Botun pingini gösterir!",
  type: 1,
  options: [],
  run: async (client, interaction) => {

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setEmoji(`1129305797126541354`)
            .setLabel(`Reklam Ver (bakımda)`)
            .setDisabled(true) 
            .setStyle(2)
            .setCustomId("reklamver")
    )

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator, false)) {
      return interaction.reply({ content: "❌ **|** Bu komutu kullanmak için **gerekli izinleri** karşılayamıyorsun.", ephemeral: true })
    }

    const server = interaction.guild

const embed = new EmbedBuilder()
.setAuthor({name: "Reklam Paneli", iconURL: server.iconURL({ dynmaic: true })})
.setDescription("> <a:ghost_duyuru:1150816079933874336> `Reklam paneline hoşgeldiniz aşağıdaki butonları kullanarak paketlerden yararlanabilirsiniz`\n\n<a:ghost_cashbag:1150815606438899782> **1- Bronze Paket 20₺**\n\nÖzel Kanal Açılır Ve Text İle Here Atılır. 1 Günlük Reklamdır.\n\n <a:ghost_cashbag:1150815606438899782> **2- Altın Paket ₺40** \n\nÖzel Kanal Açılır Çekiliş Şartı Koyulur @everyone Atılır Çekilişi Siz Karşılarsınız 3 Günlük Reklamdır.\n\n <a:ghost_cashbag:1150815606438899782> **3- Zümrüt Paket ₺70**\n\nÖzel Kanal Açılır Çekiliş Şartı Koyulur Çekilişi Biz Karşılarız. 7 Günlük Reklamdır. @everyone atılır!")
.setColor("Aqua")
.setFooter({text: "Developer By Krrazy?", iconURL: interaction.user.avatarURL()})

interaction.reply({content: "✅ | Mesaj Gönderildi", ephemeral: true})
interaction.channel.send({embeds: [embed], components: [row]})

}
}
