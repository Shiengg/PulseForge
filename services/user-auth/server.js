const express = require('express');

const app = express();
const port = process.env.PORT || 4001;

app.get('/', (req, res) => {
  res.send('user-auth service');
});

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`user-auth service đang chạy tại: http://localhost:${port}`);
});
