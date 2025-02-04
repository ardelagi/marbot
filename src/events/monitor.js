// /src/events/monitor.js
const { EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = (client) => {
  // Fungsi untuk membuat embed monitoring
  function createMonitorEmbed() {
    const embed = new EmbedBuilder()
      .setTitle("📊 Bot Status Monitoring")
      .setColor("#0099ff")
      .addFields(
        { name: "🟢 Status", value: "Online", inline: true },
        { name: "⏱️ Uptime", value: `${(process.uptime() / 60).toFixed(2)} menit`, inline: true },
        { name: "💾 Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
        { name: "🖥️ CPU Load", value: `${os.loadavg()[0].toFixed(2)} (1 min)`, inline: true },
        { name: "📶 Discord Ping", value: `${client.ws.ping} ms`, inline: true },
        { name: "🛠️ Platform", value: os.platform(), inline: true }
      )
      .setTimestamp()
      .setFooter({ text: "MARA STORE Bot Monitoring" });

    return embed;
  }

  // Fungsi untuk mengirim embed ke channel
  async function sendMonitorEmbed() {
    const channel = client.channels.cache.get("1097660358476439664"); // Ganti dengan channel ID tujuan
    if (!channel) {
      console.error("Channel tidak ditemukan!");
      return;
    }

    try {
      const embed = createMonitorEmbed();
      await channel.send({ embeds: [embed] });
      console.log("Embed monitoring berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim embed:", error);
    }
  }

  // Kirim embed setiap 5 menit (300.000 ms)
  setInterval(sendMonitorEmbed, 300000);

  // Kirim embed pertama kali saat bot aktif
  sendMonitorEmbed();
};