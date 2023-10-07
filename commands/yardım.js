const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");
const yardımDuyuru = require("./yardım-duyuru");
module.exports = {
    name: "yardım",
    description: '🛸 Komutlarımı öğrenmek için kullanabilirsin.',
    type: 1,
    dm_permission: 0,
    options: [],
    run: async (client, interaction) => {
        const Discord = require("discord.js")

        const { user, options, guild } = interaction;

        const commands = [];

        for(let length in global.commands) {
            commands.push(global.commands[length].name + "|" + global.commands[length].description)

            
        }

        const yardimDuyuru = db.get("yardımDuyuru")

        const c = commands.map(map => `**/${map.split("|")[0]}:** \`${map.split("|")[1]}\``).join("\n")
/* BİLGİ: SİSTEM KOMUTLARI OTOMATİK SIRALIYOR LÜTFEN ELLEMEYİN */
        const embed = new EmbedBuilder()
            .setAuthor({ name: `Komutlarım.`, iconURL: `${user.displayAvatarURL()} ` })
            .setDescription(`${c} \n \n Duyurular: ${yardimDuyuru || "Yok"}`)
            .setTimestamp()
            .setFooter({ text: `${user.username} tarafından inceleniyor.`, iconURL: `${user.displayAvatarURL()} ` })
/* BİLGİ: SİSTEM KOMUTLARI OTOMATİK SIRALIYOR LÜTFEN ELLEMEYİN */
try {
    await interaction.reply({ embeds: [embed] });
} catch (error) {
    console.error(":", error);
}
}
}
