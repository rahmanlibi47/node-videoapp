const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes');


app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
