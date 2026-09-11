const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;

const registry = new client.Registry();

client.collectDefaultMetrics({ registry });

const httpRequestCounter = new client.Counter({
    name: 'http_request_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route','status_code'],
});
registry.registerMetric(httpRequestCounter);

app.use((req, res, next) => {
    res.on('finish',() => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.path,
            status_code: res.statusCode,
        })
    });
    next();
})

app.get('/', async (req, res) => {
    res.send("API is running")
}
);

// Route 2: Task giả lập "nặng" (Tốn 200ms - 1s)
app.get('/work', (req, res) => {
  const delay = Math.floor(Math.random() * 800) + 200; // Ngẫu nhiên 200ms - 1000ms
  setTimeout(() => {
    res.send(`Đã xử lý xong công việc tốn ${delay}ms!`);
  }, delay);
});

// Route 3: Endpoint quan trọng nhất - Xuất Metrics cho Prometheus cào
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', registry.contentType);
  res.end(await registry.metrics());
});

app.listen(port, () => {
  console.log(` Server đang chạy tại: http://localhost:${port}`);
  console.log(` Xem metrics tại: http://localhost:${port}/metrics`);
});