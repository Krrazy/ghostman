const { EmbedBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "ticket-ayarla",
  description: "🛸 Otomatik ticket sistemini kurarsın.",
  type: 1,
  dm_permission: 0,
  options: [],
  run: async (client, interaction) => {


    await interaction.deferReply();
    const { user, options, guild } = interaction;

    const Discord = require("discord.js")
    if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
      const hataEmbed = new EmbedBuilder()
      return client.channels.cache.get(interaction.channel.id).send({ content: "Ticket sistemini ayarlamak için `Yönetici` yetkisine sahip olmalısın.", ephemeral: true })
    }

    const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId(`onayla_${user.id}`)
        .setLabel('Onaylıyorum')
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji('1151244200873054238'),
        new Discord.ButtonBuilder()
        .setCustomId(`reddet_${user.id}`)
        .setLabel('Reddetiyorum')
        .setStyle(Discord.ButtonStyle.Secondary)
        .setEmoji('1151244046359080960'),


    );

  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: `Kurulum Yardımcısı `, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })} ` })
  .setTitle(`<a:ghost_tada:1150816488878506077> | Ticket sistemi kurulsun mu?`)
  .setDescription(`> <a:ghost_yes:1151244200873054238>  **Butonu ile otomatik olarak kanallar oluşturulacaktır.** \n \n> <a:ghost_no:1151244046359080960>  **İle işlemi iptal edebilirsiniz** `)
  .setFooter({ text: `${client.user.tag} Ticket`, iconURL: `${user.displayAvatarURL({ dynmaic: true })}` })
  .setTimestamp()

  const devredisi = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId(`boscustom`)
        .setDisabled(true)
        .setLabel('Onaylıyorum')
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji('1151244200873054238'),
        new Discord.ButtonBuilder()
        .setCustomId(`gereksizcustom`)
        .setLabel('Reddetiyorum')
        .setDisabled(true)
        .setStyle(Discord.ButtonStyle.Secondary)
        .setEmoji('1151244046359080960'),

    );

  const editYeniEmbed = new EmbedBuilder()
  .setTitle("🔔 **|** Süre Doldu")
  .setDescription("4 Saniye butonlar ile etkileşim olmadığı için devre dışı bırakıldı")

   const mesaj = await interaction.followUp({ embeds: [embed], components: [row], ephemeral:true });
   setTimeout(async () => {

    await mesaj.edit({
      components: [devredisi],
      embeds: [editYeniEmbed]
    });
  }, 4000) 
}
}