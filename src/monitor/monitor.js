const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk status bot
app.get('/status', (req, res) => {
  const status = {
    status: 'online',
    uptime: process.uptime(), // Waktu aktif bot dalam detik
    memoryUsage: process.memoryUsage(), // Penggunaan memori
    cpuUsage: os.loadavg(), // Load CPU
    platform: os.platform(), // Platform (Linux/Windows)
    discordPing: client.ws.ping || 'N/A' // Ping ke Discord
  };
  res.json(status);
});

// Endpoint untuk log aktivitas
app.get('/logs', (req, res) => {
  // Contoh log aktivitas (bisa disesuaikan dengan kebutuhan)
  const logs = [
    { timestamp: new Date(), event: 'Bot started' },
    { timestamp: new Date(), event: 'Command executed: /ping' }
  ];
  res.json(logs);
});

// Jalankan server
app.listen(port, () => {
  console.log(`Monitoring server running on http://localhost:${port}`);
});