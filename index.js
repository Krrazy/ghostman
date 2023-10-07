const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("croxydb")
db.setLanguage("tr")
db.setReadable(true)
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });


});
readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
});

const {ActivityType} = require("discord.js")

const yeninesil = "Krrazy 💖"
client.once("ready", async() => {
  client.user.setPresence({ activities: [{ name: 'Takılıyorum', state: yeninesil, type: ActivityType.Custom }] });
})




client.login(TOKEN).then(() => {
  console.log("Giriş başarılı")
}).catch(() => {
console.log("Bir hata oluştu")
});


const { DMLOGİD, HATALOGİD} = require(".//config.json")


client.on("messageCreate", async message => {
  
  const { ChannelType } = require("discord.js");

if (message.channel.type === ChannelType.DM) {
  if (message.author.id === client.user.id) return;


  const dmLogEmbed = new EmbedBuilder()
    .setTitle("Bota DM Atıldı")
    .setDescription(
      `Gönderen: [${message.author.username}](https://discord.com/users/${message.author.id})`
    )
    .addFields({ name: "Mesaj İçeriği", value: `${message.content}`, inline: true });
 

  client.channels.cache.get(DMLOGİD).send({ embeds: [dmLogEmbed] });
} else {
  return;
}
})

process.on("unhandledRejection", async(error) => { 
console.log(`Bir hata oluştu: ${error}`)
})
process.on("uncaughtException", async(error) => { 
console.log(`Bir hata oluştu: ${error}`)
})
process.on("uncaughtExceptionMonitor", async(error) => { 
  console.log(`Bir hata oluştu: ${error}`)
})




/* DAVET SİSTEMİ */
const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});
tracker.on('guildMemberAdd', (member, type, invite) => {

  const data = db.get(`davetLog_${member.guild.id}`)
  if (!data) return;
  const inviteChannel = member.guild.channels.cache.get(data.channel);
  if (!inviteChannel) return db.delete(`davetLog_${member.guild.id}`); 

  const invitedMember = db.get(`invitedİnfo_${member.id}_${member.guild.id}`)
  if (invitedMember) {
      if (data.message === "embed") {

          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} giriş yaptı` })
              .setDescription(`Hoşgeldin ${member}! Daha önce <@${invitedMember.inviterİd}> tarafından davet edilmişsin! :tada:\n\n> **discord.gg/${invitedMember.inviteCode}** linkiyle giriş yapmıştın.`)
              .setFooter({ text: `${invite.inviter.username} tarafından davet edildi` })
              .setTimestamp()

          db.add(`inviteCount_${invitedMember.inviterİd}_${member.guild.id}`, 1)
          db.add(`inviteRemoveCount_${invitedMember.inviterİd}_${member.guild.id}`, -1)
          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj" && member.user.id === invite.inviter.id) {
          db.add(`inviteCount_${invitedMember.inviterİd}_${member.guild.id}`, 1)
          db.add(`inviteRemoveCount_${invitedMember.inviterİd}_${member.guild.id}`, -1)
          return inviteChannel.send({ content: `Hoşgeldin ${member}! Daha önce <@${invitedMember.inviterİd}> tarafından davet edilmişsin! ` })
      }
  }

  if (type === 'normal') {

      if (data.message === "embed" && member.user.id === invite.inviter.id) {
          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} giriş yaptı` })
              .setDescription(`Hoşgeldin ${member}! Kendi oluşturduğu davet ile gelmiş 😄\n\n> **discord.gg/${invite.code}** linkiyle giriş yaptı.`)
              .setFooter({ text: `Kendi kendini davet etmiş.` })
              .setTimestamp()

          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj" && member.user.id === invite.inviter.id) {
          return inviteChannel.send({ content: `Hoşgeldin ${member}! Kendi daveti ile gelmiş` })
      }

      if (data.message === "embed") {

          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} giriş yaptı` })
              .setDescription(`Hoşgeldin ${member}! **${invite.inviter.username}** seni davet etti! \n\n> **discord.gg/${invite.code}** linkiyle giriş yaptı.`)
              .setFooter({ text: `${invite.inviter.username} tarafından davet edildi` })
              .setTimestamp()

          db.set(`invitedİnfo_${member.id}_${member.guild.id}`, { inviterİd: invite.inviter.id, inviteCode: invite.code })
          db.add(`inviteCount_${invite.inviter.id}_${member.guild.id}`, 1)
          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj") {
          db.set(`invitedİnfo_${member.id}_${member.guild.id}`, { inviterİd: invite.inviter.id, inviteCode: invite.code })
          db.add(`inviteCount_${invite.inviter.id}_${member.guild.id}`, 1)
          return inviteChannel.send({ content: `Hoşgeldin ${member}! seni **${invite.inviter.username}** davet etti` })
      }
  }

  else if (type === 'permissions') {
      if (data.message === "embed") {
          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} giriş yaptı` })
              .setDescription(`Hoşgeldin ${member}! 😭 Yetkim olmadığı için seni kimin davet etti öğrenemiyorum`)
              .setFooter({ text: `Maalesef :(` })
              .setTimestamp()

          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj") {
          return inviteChannel.send({ content: `Hoşgeldin ${member}!😭 Yetkim olmadığı için seni kimin davet etti öğrenemiyorum` })
      }
  }

  else if (type === 'unknown') {
      if (data.message === "embed") {
          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} giriş yaptı` })
              .setDescription(`Hoşgeldin ${member}! Bilinmeyen bir şekilde sunucuya gelmişsin 🧐`)
              .setTimestamp()

          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj") {
          return inviteChannel.send({ content: `Hoşgeldin ${member}! 🤷‍♂️ Çok garip bir şekilde sunucuya gelmişsin ` })
      }
  }
})

const {EmbedBuilder} = require("discord.js")
client.on('guildMemberRemove', (member) => {

  const data = db.get(`davetLog_${member.guild.id}`)
  if (!data) return;
  const inviteChannel = member.guild.channels.cache.get(data.channel);
  if (!inviteChannel) return db.delete(`davetLog_${member.guild.id}`); 

  const invitedMember = db.get(`invitedİnfo_${member.id}_${member.guild.id}`)
  if (invitedMember) {
      if (data.message === "embed") {
          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} çıkış yaptı` })
              .setDescription(`Görüşürüz ${member}! <@${invitedMember.inviterİd}> tarafından davet edilmişti! \n\n> **discord.gg/${invitedMember.inviteCode}** linkiyle giriş yapmıştı.`)
              .setFooter({ text: `👋, ${member.guild.memberCount} kişi kaldık` })
              .setTimestamp()

          db.add(`inviteRemoveCount_${invitedMember.inviterİd}_${member.guild.id}`, 1)
          db.add(`inviteCount_${invitedMember.inviterİd}_${member.guild.id}`, -1)
          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj" && member.user.id === invite.inviter.id) {
          db.add(`inviteRemoveCount_${invitedMember.inviterİd}_${member.guild.id}`, 1)
          db.add(`inviteCount_${invitedMember.inviterİd}_${member.guild.id}`, -1)
          return inviteChannel.send({ content: `Görüşürüz ${member}! <@${invitedMember.inviterİd}> tarafından davet edilmişti! 👋` })
      }
  } else {
      if (data.message === "embed") {

          const invite_embed = new EmbedBuilder()
              .setColor("DarkButNotBlack")
              .setAuthor({ name: `${member.user.username} çıkış yaptı` })
              .setDescription(`Görüşürüz ${member}! Nasıl geldiğini bilmiyorum 🤷‍♂️`)
              .setFooter({ text: `👋, ${member.guild.memberCount} kişi kaldık` })
              .setTimestamp()

          return inviteChannel.send({ embeds: [invite_embed] })
      }

      if (data.message === "mesaj" && member.user.id === invite.inviter.id) {
          return inviteChannel.send({ content: `Görüşürüz ${member}! Onu kim davet etti bilmiyorum 🤷‍♂️` })
      }
  }
})


client.on('interactionCreate',async (interaction) => {


    if(interaction.customId === "captcha") {
  
    interaction.member.roles.add("1144880601174917214").catch(e => {})
    interaction.member.roles.remove("1144884335477006366").catch(e => {})

   interaction.reply({content: "Rolün başarıyla verildi", ephemeral: true})
  
    
    }
  
    if(interaction.customId === "captcha2") {
    
      const channelid = client.channels.cache.get(config.channelid)
      if(!channelid) return;
  
  const embed = new EmbedBuilder()
  .setAuthor({name: "Hatalı Kod Girişi!", iconURL: interaction.user.avatarURL()})
  .setDescription(`${interaction.user.tag} Adlı kullanıcı yanlış kod kullandı ve sunucudan atıldı.`)
  .setFooter({text: "Krrazy :)"})
  .setColor("Red")
  
      channelid.send({embeds: [embed]})
  
      interaction.member.kick().catch(e => {})
      
      }
  
      if(interaction.customId === "captcha3") {
    
        const channelid = client.channels.cache.get(config.channelid)
        if(!channelid) return;
    
    const embed = new EmbedBuilder()
    .setAuthor({name: "Hatalı Kod Girişi!", iconURL: interaction.user.avatarURL()})
    .setDescription(`${interaction.user.tag} Adlı kullanıcı yanlış kod kullandı ve sunucudan atıldı.`)
    .setFooter({text: "Krrazy :)"})
    .setColor("Red")
    
        channelid.send({embeds: [embed]})
    
        interaction.member.kick().catch(e => {})
        
        }
        if(interaction.customId === "captcha4") {
    
          const channelid = client.channels.cache.get(config.channelid)
          if(!channelid) return;
      
      const embed = new EmbedBuilder()
      .setAuthor({name: "Hatalı Kod Girişi!", iconURL: interaction.user.avatarURL()})
      .setDescription(`${interaction.user.tag} Adlı kullanıcı yanlış kod kullandı ve sunucudan atıldı.`)
      .setFooter({text: "Krrazy :)"})
      .setColor("Red")
      
          channelid.send({embeds: [embed]})
      
          interaction.member.kick().catch(e => {})
          
          }
  
  
    })
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        let message = await interaction.channel.messages.fetch(interaction.message.id)  
        if(interaction.customId == "moderasyon") {
      const embed = new Discord.EmbedBuilder()
      .setTitle("<a:ghost_davetetkazan:1156683480160276550> Ghost Rewards - Genel Ödüller! <a:ghost_davetetkazan:1156683480160276550>")
      .setDescription("> <a:ghost_clnitro:1150851839684771942> `20 Davet = Nitro Classic Gift`\n> <a:ghost_nitrob:1150851720671399966> `30 Davet = Nitro Boost Gift`\n> <:ghost_submsg:1150853289907335310><:ghost_minicon:1150857457686544494> **10 Davet = Nitro Promosyon Kodu (1 Aylık)**\n> <:ghost_submsg:1150853289907335310><:ghost_minicon:1150857457686544494> **15 Davet = Nitro Promosyon Kodu (3 Aylık)**\n> <:ghost_robux:1150859350831804508> `15 Davet = 4600 Robux` \n> <a:ghost_valorant:1150859876248076348> `12 Davet = 3400 Valorant Points` \n> <a:ghost_spotify:1150817916162429018> `7 Davet = Spotify Premium Aile Daveti` \n> <a:ghost_youtube:1150861744466559096> `5 Davet = Youtube Premium` \n> <:ghost_lol:1150817982889590815> `12 Davet = League Of Legends 1675 Rp` \n> <a:ghost_owo:1150862717117288548> `3 Davet = 200K OwO Cash` \n> <:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> **6 Davet = 425K OwO Cash** \n> <:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> **13 Davet = 1M 200K OwO Cash** \n> <:ghost_ininal:1150864521183899749> `11 Davet = 15 Türk Lirası` \n> <:ghost_papara:1150864922465554532> `11 Davet = 15 Türk Lirası` \n\n<a:ghost_pin:1150816827958628404> **NOT: Genel Ödüller Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP)")
      .setColor("Random")
      interaction.reply({embeds: [embed], components: [], ephemeral: true})
        }
        if(interaction.customId == "kayıt") {
          const embed = new Discord.EmbedBuilder()
          .setTitle("<a:ghost_dev:1150869831718031372> Ghost Rewards - Code Ödüller! <a:ghost_dev:1150869831718031372>")
          .setDescription("> <a:ghost_ates:1150819848100778035> `35 Davet = Bu Botun Altyapısı`\n> <a:ghost_ates:1150819848100778035> `3 Davet = Register Bot V14 + Slash`\n> <a:ghost_ates:1150819848100778035> `5 Davet = Supervisor Bot Gelişmiş Emojili + Butonlu`\n> <a:ghost_ates:1150819848100778035> `1 Davet = Meme Bot V14 + Slash Onaylı Bot`\n> <a:ghost_ates:1150819848100778035> `2 Davet = Discord Onaylı Bot +100 Komutlu + Slash V14`\n> <a:ghost_ates:1150819848100778035> `6 Davet = Gelişmiş Sistemli V14 + Slash Çekiliş Botu`\n\n<a:ghost_pin:1150816827958628404> **NOT: Altyapılar Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP)")
          .setColor("Random")
          interaction.reply({embeds: [embed], components: [], ephemeral: true})
        }
        if(interaction.customId == "random") {
          const embed = new Discord.EmbedBuilder()
          .setTitle("<a:ghost_tac:1150817087518937105> Ghost Rewards - Random Ödüller! <a:ghost_tac:1150817087518937105>")
          .setDescription("> <a:ghost_valorant:1150859876248076348> `1 Davet = Random Valorant Hesap x50 (⛔ Skin)`\n<:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> `2 Davet = Random Valorant Hesap x50 (✅ Skin)`\n> <a:ghost_spotify:1150817916162429018> `2 Davet = Random Spotify Aile Yönetici Hesabı`\n> <:ghost_lol:1150817982889590815> `1 Davet = league Of Legends Random Hesap x100`\n> <a:ghost_clnitro:1150851839684771942> `3 Davet = Random Nitro Classic X100 Adet`\n> <a:ghost_nitrob:1150851720671399966> `4 Davet = Nitro Boost Random Code x1000` \n\n<a:ghost_pin:1150816827958628404> **NOT: Random Hesaplar Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP)")
          .setColor("Random")
          interaction.reply({embeds: [embed], components: [], ephemeral: true})
        }
        if(interaction.customId == "kullanıcı") {
          const embed = new Discord.EmbedBuilder()
          .setTitle("<a:ghost_firedolar:1150817581205295184> Ghost Rewards - Hesap Ödülleri! <a:ghost_firedolar:1150817581205295184>")
          .setDescription("> <a:ghost_netflx:1151201204706234479> `5 Davet = Netflix Çalışan Hesap (✨ 1 Aylık)`\n> <a:ghost_spotify:1150817916162429018> `12 Davet = Spotify Aile Yönetici Hesap (🗽 1 Aylık)`\n> <a:ghost_disney:1151202344382500944> `3 Davet = Disney+ Çalışan Hesap (👀 1 Aylık)` \n> <a:ghost_valorant:1150859876248076348> `4 Davet = Valorant Çalışan Hesap (🎋 +20 Skin Garanti)` \n <:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> `9 Davet = Valorant Çalışan Hesap (🎋 +50 Skin Garanti)`\n <:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> `14 Davet = Valorant Çalışan Hesap (🎋 +100 Skin Garanti)` \n> <a:ghost_steamx:1151205270832287864> `10 Davet = Steam 1K'lık Hesap (🎄 +20 Oyun Garanti)` \n> <:ghost_exxen:1151230979034329210> `2 Davet = Exxen Reklamsız Hesap (🧨 1 Aylık)`\n\n<a:ghost_pin:1150816827958628404> **NOT: Hesaplar Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP) ")
          .setColor("Random")
                interaction.reply({embeds: [embed], components: [], ephemeral: true})
        }
        if(interaction.customId == "satıs") {
          const embed = new Discord.EmbedBuilder()
          .setTitle("<:ghost_market:1153066230052298806> Ghost Rewards - Market Bölümü! <:ghost_market:1153066230052298806>")
          .setDescription("> <a:ghost_duyuru:1150816079933874336> `Market Bölümümüz Buraya Taşınmıştır Gelişmiş Market İçin` [Tıkla](https://discord.gg/pmbUbusP)")
          .setColor("Random")
                interaction.reply({embeds: [embed], components: [], ephemeral: true})
        }
      })
client.on("messageCreate", async message => {
    const db = require("croxydb");
  
    if (await db.get(`afk_${message.author.id}`)) {
     
      db.delete(`afk_${message.author.id}`);
  
      message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
    }
  
    var kullanıcı = message.mentions.users.first();
    if (!kullanıcı) return;
    var sebep = await db.get(`afk_${kullanıcı.id}`);
  
    if (sebep) {
      message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
    }
  });
        //AYRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

  client.on("interactionCreate", async interaction => {
    if (!interaction.isButton()) return;
    let message = await interaction.channel.messages.fetch(interaction.message.id)  
    if(interaction.customId == "swsatıs") {
  const embed = new Discord.EmbedBuilder()
  .setTitle("<a:ghost_kurt:1156703147314651146> Ghost Rewards - Sunucu Satış! <a:ghost_kurt:1156703147314651146>")
  .setDescription("<:ghost_selam:1156963413738672228> **Selam Güzel İnsan Ghost Rewards Adı Altında Satılan Sunucuları Aşşağıda Derledim:** \n\n > <a:ghost_ates:1150819848100778035> `1.9M OwO / 10 Davet = https://discord.gg/Xe5G3uzW` \n > <a:ghost_ates:1150819848100778035> `900K OwO / 6 Davet = https://discord.gg/PTz6maQh` \n > <a:ghost_ates:1150819848100778035> `750K OwO / 5 Davet = https://discord.gg/N9amyVnM` \n > <a:ghost_ates:1150819848100778035> `750K OwO / 5 Davet = https://discord.gg/DG9XMt6u`  \n > <a:ghost_ates:1150819848100778035> `550K OwO / 4 Davet = https://discord.gg/Wv2fFsu3` \n > <a:ghost_ates:1150819848100778035> `850K OwO / 7 Davet = https://discord.gg/Wv2fFsu3`\n > <a:ghost_ates:1150819848100778035> `1.3M OwO / 9 Davet = https://discord.gg/MbddeyUp`\n > <a:ghost_ates:1150819848100778035> `375K OwO / 3 Davet = https://discord.gg/uEx6acMb` \n\n<a:ghost_pin:1150816827958628404> **NOT: Sunucu Satış Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP)")
  .setColor("Random")
  interaction.reply({embeds: [embed], components: [], ephemeral: true})
    }
    if(interaction.customId == "ortak") {
      const embed = new Discord.EmbedBuilder()
      .setTitle("Yakında")
      .setDescription("> <a:ghost_ates:1150819848100778035> `35 Davet = Bu Botun Altyapısı`\n> <a:ghost_ates:1150819848100778035> `3 Davet = Register Bot V14 + Slash`\n> <a:ghost_ates:1150819848100778035> `5 Davet = Supervisor Bot Gelişmiş Emojili + Butonlu`\n> <a:ghost_ates:1150819848100778035> `1 Davet = Meme Bot V14 + Slash Onaylı Bot`\n> <a:ghost_ates:1150819848100778035> `2 Davet = Discord Onaylı Bot +100 Komutlu + Slash V14`\n> <a:ghost_ates:1150819848100778035> `6 Davet = Gelişmiş Sistemli V14 + Slash Çekiliş Botu`\n\n<a:ghost_pin:1150816827958628404> **NOT: Altyapılar Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP)")
      .setColor("Random")
      interaction.reply({embeds: [embed], components: [], ephemeral: true})
    }
    if(interaction.customId == "random") {
      const embed = new Discord.EmbedBuilder()
      .setTitle("<a:ghost_tac:1150817087518937105> Ghost Rewards - Random Ödüller! <a:ghost_tac:1150817087518937105>")
      .setDescription("> <a:ghost_valorant:1150859876248076348> `1 Davet = Random Valorant Hesap x50 (⛔ Skin)`\n<:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> `2 Davet = Random Valorant Hesap x50 (✅ Skin)`\n> <a:ghost_spotify:1150817916162429018> `2 Davet = Random Spotify Aile Yönetici Hesabı`\n> <:ghost_lol:1150817982889590815> `1 Davet = league Of Legends Random Hesap x100`\n> <a:ghost_clnitro:1150851839684771942> `3 Davet = Random Nitro Classic X100 Adet`\n> <a:ghost_nitrob:1150851720671399966> `4 Davet = Nitro Boost Random Code x1000` \n\n<a:ghost_pin:1150816827958628404> **NOT: Random Hesaplar Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP)")
      .setColor("Random")
      interaction.reply({embeds: [embed], components: [], ephemeral: true})
    }
    if(interaction.customId == "kullanıcı") {
      const embed = new Discord.EmbedBuilder()
      .setTitle("<a:ghost_firedolar:1150817581205295184> Ghost Rewards - Hesap Ödülleri! <a:ghost_firedolar:1150817581205295184>")
      .setDescription("> <a:ghost_netflx:1151201204706234479> `5 Davet = Netflix Çalışan Hesap (✨ 1 Aylık)`\n> <a:ghost_spotify:1150817916162429018> `12 Davet = Spotify Aile Yönetici Hesap (🗽 1 Aylık)`\n> <a:ghost_disney:1151202344382500944> `3 Davet = Disney+ Çalışan Hesap (👀 1 Aylık)` \n> <a:ghost_valorant:1150859876248076348> `4 Davet = Valorant Çalışan Hesap (🎋 +20 Skin Garanti)` \n <:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> `9 Davet = Valorant Çalışan Hesap (🎋 +50 Skin Garanti)`\n <:ghost_submsg:1150853289907335310> <:ghost_minicon:1150857457686544494> `14 Davet = Valorant Çalışan Hesap (🎋 +100 Skin Garanti)` \n> <a:ghost_steamx:1151205270832287864> `10 Davet = Steam 1K'lık Hesap (🎄 +20 Oyun Garanti)` \n> <:ghost_exxen:1151230979034329210> `2 Davet = Exxen Reklamsız Hesap (🧨 1 Aylık)`\n\n<a:ghost_pin:1150816827958628404> **NOT: Hesaplar Hakkında Daha Detaylı Bilgi İçin** [Tıkla](https://discord.gg/pmbUbusP) ")
      .setColor("Random")
            interaction.reply({embeds: [embed], components: [], ephemeral: true})
    }
    if(interaction.customId == "satıs") {
      const embed = new Discord.EmbedBuilder()
      .setTitle("<:ghost_market:1153066230052298806> Ghost Rewards - Market Bölümü! <:ghost_market:1153066230052298806>")
      .setDescription("> <a:ghost_duyuru:1150816079933874336> `Market Bölümümüz Buraya Taşınmıştır Gelişmiş Market İçin` [Tıkla](https://discord.gg/pmbUbusP)")
      .setColor("Random")
            interaction.reply({embeds: [embed], components: [], ephemeral: true})
    }
  })
        //AYRIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

client.on("messageCreate", async message => {
const db = require("croxydb");

if (await db.get(`afk_${message.author.id}`)) {
 
  db.delete(`afk_${message.author.id}`);

  message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
}

var kullanıcı = message.mentions.users.first();
if (!kullanıcı) return;
var sebep = await db.get(`afk_${kullanıcı.id}`);

if (sebep) {
  message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
}
});
  client.on('interactionCreate', async (interaction) => {
    if(interaction.customId === "reklamver") {
  
      if (!interaction.guild) return;
    
      const { user, customId, guild } = interaction;
  
      const reklam1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`demir`)
          .setLabel('Demir Paket')
          .setEmoji("1132784696112205946")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`altın`)
          .setLabel('Altın Paket')
          .setEmoji("1132784905978380398")
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`elmas`)
          .setLabel('Zümrüt Paket')
          .setEmoji("1132784440913961070")
          .setStyle(ButtonStyle.Secondary)
      );
  
  const embed = new EmbedBuilder()
  .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
  .setDescription(`> Selam **${interaction.user.tag}**, Aşağıdaki paketlerden birini seçip reklamını yaptır.`)
  .setColor("Blue")
  .setFooter({text: "discord.gg/nitrobase"})
  
  interaction.reply({embeds: [embed], ephemeral: true, components: [reklam1]})
  
  }
  
  if(interaction.customId === "demir") {
  
    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;
  
    const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);
  
    const channel = await guild.channels.create({
      name: `reklam-${user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
         {
          id: user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    })
  
    const odeme = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`kapat`)
        .setLabel('Kapat')
        .setEmoji("🔒")
        .setStyle(4)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`odeme`)
        .setLabel('Ödeme Yöntemi')
        .setEmoji("💸")
        .setStyle(ButtonStyle.Secondary)
    )
  
    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
    .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Demir**`)
    .setFooter({text: "discord.gg/nitrobase"})
    .setColor("Blue")
  
    interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
    channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
  
    wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id })
  
  }
  
  if(interaction.customId === "odeme") {
  
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`papara`)
        .setLabel('Papara')
        .setEmoji("1132787076883021935")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`ininal`)
        .setLabel('İninal')
        .setEmoji("1132787076883021935")
        .setStyle(ButtonStyle.Secondary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`ziraat`)
        .setLabel('Ziraat')
        .setEmoji("1132787076883021935")
        .setStyle(ButtonStyle.Secondary)
    )
  
    const embed = new EmbedBuilder()
    .setAuthor({name: "Ödeme Yöntemleri", iconURL: client.user.avatarURL()})
    .setDescription("> Aşağıdaki butonları kullanarak **ödeme yönteminizi** seçiniz.")
    .setFooter({text: "Wixua Tester"})
    .setColor("Blue")
  
    interaction.reply({embeds: [embed], components: [row], ephemeral: true})
  
  }
  
  if(interaction.customId === "papara") {
  
    const papara = new EmbedBuilder()
    .setAuthor({name: "Papara Ödeme"})
    .setDescription("**Papara no:** YAKINDA \n**Ad Soyad:** YAKINDA")
    .setThumbnail("https://cdn.discordapp.com/attachments/1114479978826956810/1114482707104268328/download.png")
    .setFooter({text: "Wixua Tester"})
    .setColor("Green")
  
    interaction.reply({embeds: [papara], ephemeral: true})
  }
  if(interaction.customId === "ininal") {
  
    const ininal = new EmbedBuilder()
    .setAuthor({name: "İninal Ödeme"})
    .setDescription("**İninal no:** YAKINDA \n**Ad Soyad:** YAKINDA ")
    .setThumbnail("https://cdn.discordapp.com/attachments/1114479978826956810/1114484094630383656/download.png")
    .setFooter({text: "Wixua Tester"})
    .setColor("Green")
  
    interaction.reply({embeds: [ininal], ephemeral: true})
  }
  if(interaction.customId === "ziraat") {
  
    const ziraat = new EmbedBuilder()
    .setAuthor({name: "Ziraat Ödeme"})
    .setDescription("**Ziraat no:** TR00...... \n**Ad Soyad:** Y... M...")
    .setThumbnail("https://cdn.discordapp.com/attachments/1114479978826956810/1114485169198473216/images.png")
    .setFooter({text: "Wixua Tester"})
    .setColor("Green")
  
    interaction.reply({embeds: [ziraat], ephemeral: true})
  }
  
  if(interaction.customId === "altın") {
  
    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;
  
    const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);
  
    const channel = await guild.channels.create({
      name: `reklam-${user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
         {
          id: user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    })
  
    const odeme = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`kapat`)
        .setLabel('Kapat')
        .setEmoji("🔒")
        .setStyle(4)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`odeme`)
        .setLabel('Ödeme Yöntemi')
        .setEmoji("💸")
        .setStyle(ButtonStyle.Secondary)
    )
    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
    .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Altın**`)
    .setFooter({text: "discord.gg/nitrobase"})
    .setColor("Blue")
  
    interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
    channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
  
    wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id })
  
  }
  if(interaction.customId === "elmas") {
  
    if (!interaction.guild) return;
  
    const { user, customId, guild } = interaction;
  
    const reklamKato = wixua.fetch(`reklamKato_${guild.id}`);
  
    const channel = await guild.channels.create({
      name: `reklam-${user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
         {
          id: user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
        },
      ],
    })
  
    const odeme = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`kapat`)
        .setLabel('Kapat')
        .setEmoji("🔒")
        .setStyle(4)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`odeme`)
        .setLabel('Ödeme Yöntemi')
        .setEmoji("💸")
        .setStyle(ButtonStyle.Secondary)
    )
  
    const embed = new EmbedBuilder()
    .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
    .setDescription(`> Selam Hoşgeldin **${user.tag}**, işlemler için yetkilileri bekleyiniz.\n\n> Seçilen Paket: **Zümrüt**`)
    .setFooter({text: "discord.gg/nitrobase"})
    .setColor("Blue")
  
    interaction.reply({content: `🎉 | Kanalın başarıyla **açıldı** yetkililer ilgilenicek senle`, ephemeral: true})
    channel.send({embeds: [embed], content: `<@${interaction.user.id}>`, components: [odeme]})
  
    wixua.set(`reklamKato_${interaction.guild.id}`, { channelId: channel.id})
  
  }
  if(interaction.customId === "kapat") {
  
    interaction.channel.delete()
  }
  })
  
client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'Sa' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin ☺️`)
}
}
})