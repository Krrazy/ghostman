const { Client, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
    name:"banner",
    description: '🛸 Bannerine bakarsın.',
    type:1,
    options: [
      {
        name:"kullanıcı",
        description:"Bannerine bakmak istediğin kullanıcı etiketle!",
        type:6,
        required:true
    },
  
],
run: async(client, interaction) => {
    const { DiscordBanners } = require('discord-banners');
    const discordBanners = new DiscordBanners(client);
const target = interaction.options.getMember('kullanıcı')
const banner = await discordBanners.getBanner(target.user.id, { dynamic: true });
if (banner.includes('https')) {
    const embed = new EmbedBuilder()
    .setDescription(`<a:ghost_sagok:1150815664202862692> **\`(<@${target.user.id}>\`) adlı kullanıcının banneri!**`)
    .setImage(banner)
    .setColor("Random")
return interaction.reply({embeds: [embed]})
} else if (!banner.includes('https')) {
  const embed = new EmbedBuilder()
  .setDescription(`<a:ghost_no:1151244046359080960>  Bu kullanıcıda banner bulunmamaktadır! \n\n 📔 Not: Hata olduğunu düşünüyorsanız [Discord](https://discord.gg/FZXQB6Z7) sunucumuza gelebilirsiniz.`)
  return interaction.reply({ embeds: [embed] });
  }  

}
};