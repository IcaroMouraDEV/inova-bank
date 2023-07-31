require('dotenv').config();
const app = require('./app');

const port = 3001 || process.env.PORT; 

app.listen(port, () => console.log('server running on port 3001'))