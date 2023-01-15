const http = require('http')
const app = require('./app')
const { PORT } = require('./config/config')
// const logger = require('./utils/logger')

const server = http.createServer(app)
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
