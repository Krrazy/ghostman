const { PermissionsBitField, ChannelType, EmbedBuilder } = require("discord.js");
const db = require('croxydb');
const Discord = require('discord.js');
const { Permissions } = require("discord.js")
module.exports = {
    name:"rewards-kur",
    description: '🛸 Otomatik Rewards Sunucu kurarsın!',
    type:1,
    options: [],
  run: async(client, interaction) => {

    if(interaction.user.id !== interaction.guild.ownerId) return interaction.reply('<a:ghost_no:1151244046359080960> | Bu komutu sadece **sunucu sahibi** kullanabilir!')


    const row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setLabel('Onayla')
            .setEmoji("1151244200873054238")
            .setStyle('Success')
            .setCustomId('sunucukuronay_')
            .setDisabled(true),
        new Discord.ButtonBuilder()
            .setCustomId('sunucukurred_'+interaction.user.id)
            .setLabel('İptal')
            .setEmoji("1151244046359080960")
            .setStyle('Danger')
            .setDisabled(true),

    );

const embed = new EmbedBuilder()
    .setDescription(`Yakında...`)

interaction.reply({ embeds: [embed], components: [row] })
}

};