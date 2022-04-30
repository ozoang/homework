var http = require('http')
const date = new Date()

http
    .createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Supara Kaewsawang\n' +
            date.getDate() + '/' +
            date.getMonth() + '/' +
            date.getFullYear() + '\n' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds()
        )
    })
    .listen(2337, '127.0.0.1')
console.log('Server running at http://127.0.0.1:2337/')