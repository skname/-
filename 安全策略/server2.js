const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Security-Policy', 'default-src,self')
    if (req.url == '/get') {
        let script = `<script>
            alert('你把攻击了')
        <script>
        `
        res.setHeader('Content-Type', 'script')
        res.end(script)
    }

    if (req.url == '/h') {
        fs.readFile('./2.html', 'utf-8', (err, data) => {
            if (err) return console.log(err);
            console.log(1)
            res.end(data)
        })
    }
}).listen(3000, () => {

})