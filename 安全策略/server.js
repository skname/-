const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
    if (req.url == '/') {
        fs.readFile('./1.html', 'utf-8', (err, data) => {
            if (err) return console.log(err);
            console.log(1)
            res.end(data)
        })
    }
}).listen(3001, () => {
    console.log('runing!')
})