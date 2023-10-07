const { Collection, EmbedBuilder, codeBlock } = require("discord.js");
const Discord = require("discord.js")
const croxy = require("croxydb");
const orio = require("orio.db")
const { readdirSync } = require("fs");
module.exports = async(client, interaction) => {

  if (!interaction.guild) return;
  
  const { user, customId, guild } = interaction;
  
  if(interaction.isButton()) {
    if(interaction.customId === `reddet_${interaction.user.id}`) {
      return interaction.update({ content: "<a:atlantic_onay:1146058307719659561> **|** Destek sistemi kurulumu iptal edildi.", embeds: [], components: [] })
    }
    
    if(interaction.customId === `onayla_${interaction.user.id}`) {
      interaction.update({ content: "<a:atlantic_onay:1146058307719659561> **|** Destek sistemi kurulumu başarılı.", embeds: [], components: [] });
      
      const ticketac = new Discord.EmbedBuilder()
      .setAuthor({ name: `Ticket Sistemi`, iconURL: `${guild.iconURL({ dynmaic: true })}` })
      .setThumbnail(guild.iconURL({ dynmaic: true }))
      .setDescription(`<a:atlantic_duyuru:1146063396110860372> Destek talebi açmak için aşağıdaki **Destek talebi oluştur** butonuna tıklamalısın.\n\n<a:atlantic_zil:1146063728568180796> **Unutma:** Gereksiz yere ticket açman ceza almana sebep olabilir`)
      .setFooter({ text: `${guild.name}`, iconURL: `${user.displayAvatarURL({ dynmaic: true })}` })
      .setTimestamp()
      
      const ticketacbuton = new Discord.ActionRowBuilder()
			.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId(`ticketAc_${guild.id}`)
					.setLabel('Destek talebi oluştur')
          .setEmoji("1146061832193310802")
					.setStyle(Discord.ButtonStyle.Secondary)
			);
      
      const category = await guild.channels.create({
        name: 'Ticket',
        type: Discord.ChannelType.GuildCategory,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Discord.PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });
      
      const ticketLog = await guild.channels.create({
        name: 'ticket-log',
        type: Discord.ChannelType.GuildText,
        parent: category.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [Discord.PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });
      
      croxy.set(`ticketKatagor_${guild.id}`, { category:  category.id, log: ticketLog.id });
      croxy.set(`ticketSistem_${guild.id}`, { isOpen: true });
      
      return interaction.channel.send({ embeds: [ticketac], components: [ticketacbuton] })
    }
  }

  if(interaction.customId === `ticketAc_${interaction.guild.id}`) {
      
    const ticketKatagor = croxy.fetch(`ticketKatagor_${guild.id}`);
    const ticketSistem = croxy.fetch(`ticketSistem_${guild.id}`);
    const ticketKullanıcı = croxy.fetch(`ticketKullanıcı_${user.id}${guild.id}`);
    
    if(!ticketSistem) return;
    if(!ticketKatagor) return;
    
    if(ticketKullanıcı) {
      const channelURL = `https://discord.com/channels/${ticketKullanıcı.guildId}/${ticketKullanıcı.channelId} `
      return interaction.reply({ content: `❌ **|** Zaten bir tane [destek kanalı](${channelURL}) oluşturmuşssun.`, ephemeral: true })
    }
    
    const channel = await guild.channels.create({
      name: `ticket-${user.username}`,
      type: Discord.ChannelType.GuildText,
      parent: ticketKatagor.category,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [Discord.PermissionsBitField.Flags.ViewChannel],
        },
         {
          id: user.id,
          allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages],
        },
      ],
    });

    orio.set(`ticketKullanıcı_${user.id}${guild.id}`, { isTicketAc: true, channelId: channel.id, guildId: guild.id, date: Date.now() });
    orio.set(`ticketKanalKullanıcı_${channel.id}${guild.id}`, { userId: user.id, channelId: channel.id, guildId: guild.id });
    
    const channelURL = `https://discord.com/channels/${guild.id}/${channel.id} `
    
    const ticketUserEmbed = new Discord.EmbedBuilder()
    .setAuthor({ name: `${user.username} | Destek açıldı`, iconURL: `${user.displayAvatarURL({ dynmaic: true })} ` })
    .setThumbnail(guild.iconURL({ dynmaic: true }))
    .addFields([
      {
        name: "Destek açan:",
        value: `${interaction.user}`,
        inline: true
      },
      {
        name: "Açılış zamanı:",
        value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`,
        inline: true
      }
    ])
    .setFooter({ text: `Oluşturan: ${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })}` })
    .setTimestamp()
    
    const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId(`ticketKapat_${guild.id}${channel.id}`)
        .setLabel('Destek kapatılsın.')
        .setEmoji("❌")
        .setStyle(Discord.ButtonStyle.Secondary),
    );
    
    interaction.reply({ content: `<a:atlantic_onay:1146058307719659561> |** Senin için bir tane [destek kanalı](${channelURL}) oluşturuldu.**`, ephemeral: true })
    const chnlMessage = await channel.send({content: "Yetkililer en kısa zamanda sizinle ilgilenecektir.", embeds: [ticketUserEmbed], components: [row] })
    
    return chnlMessage.pin()
  }

  if(customId === `ticketKapat_${guild.id}${interaction.channel.id}`) {
      
    const ticketKullanıcı = orio.fetch(`ticketKanalKullanıcı_${interaction.channel.id}${guild.id}`);
    if(!ticketKullanıcı) {
        return interaction.channel.delete();
    }

    if(ticketKullanıcı) {
      member = await client.users.cache.get(ticketKullanıcı.userId);
      
      const channel = await client.channels.cache.get(croxy.fetch(`ticketKatagor_${guild.id}`).log)
    /*  */
    const ticketUserClose = new Discord.EmbedBuilder()
    .setAuthor({ name: `${client.user.username} | Ticket Log`, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })} ` })
    .setDescription(`${member.tag} tarafından açılan destek <t:${parseInt(Date.now() / 1000)}:R> sonlandırıldı`)
    .setThumbnail(user.displayAvatarURL({ dynmaic: true }))
    .addFields([
      {
        name: "Açılış tarihi:",
        value: `<t:${parseInt((ticketKullanıcı.date ?? Date.now()) / 1000)}:R>`,
        inline: true
      },
      {
        name: "Açan kişi:",
        value: `${codeBlock("yaml", member.tag)}`,
        inline: true
      },
      { name: '\u200B', value: '\u200B' },
      {
        name: "Kapanış tarihi:",
        value: `<t:${parseInt(Date.now() / 1000)}:R>`,
        inline: true
      },
      {
        name: "Kapatan kişi:",
        value: `${codeBlock("yaml", user.tag)}`,
        inline: true
      }
    ])
    
    channel.send({ embeds: [ticketUserClose] })
      
    orio.delete(`ticketKullanıcı_${ticketKullanıcı.userId}${guild.id}`)
    orio.delete(`ticketKanalKullanıcı_${interaction.channel.id}${guild.id}`); 
      
      return interaction.channel.delete();
    }
    
    
  }

  if(interaction.isChatInputCommand()) {
    if (!interaction.guildId) return;
    readdirSync('./commands').forEach(f => {
      const cmd = require(`../commands/${f}`);
      if(interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
        return cmd.run(client, interaction, croxy);
      }
});
}
  }
 