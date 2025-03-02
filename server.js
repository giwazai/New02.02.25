const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const { buffer } = require('stream/consumers')

const dataPath = path.join(__dirname, 'data')

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    if (req.url == '/jokes' && req.method == 'GET') {
        getAllJokes(req, res)
    }
    if (req.url == '/jokes' && req.method == 'POST') {
        addJoke(req, res)
    }
    if (req.url.startsWith('/like')){
        like(req, res)
    }
    if (req.url.startsWith('/dislikes')){
        dislikes(req, res)
    }
});

server.listen(3000)

function getAllJokes(req, res) {
    let dir = fs.readdirSync(dataPath)
    let allJokes = []
    for (let i = 0; i < dir.length; i++) {
        let file = fs.readFileSync(path.join(dataPath, i + ".json"))
        let jokeJSON = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJSON)
        joke.id = i
        allJokes.push(joke)
    }
    res.end(JSON.stringify(allJokes))
}

function addJoke(req, res) {
    let data = ''
    req.on('data', function (chank) {
        data += chank;
    })
    req.on('end', function () {
        let joke = JSON.parse(data)
        joke.likes = 0
        joke.unlikes = 0

        let dir = fs.readdirSync(dataPath)
        let filename = dir.length + '.json'
        let filePath = path.join(dataPath, fileName)
        fs.writeFileSync(filePath, JSON.stringify(joke))
    })
    res.end()
}

function like(req, res){
    const url = require('url')
    const params = url.parse(req.url, true).query;
    let id = params.id
    if(id){
        let filePath = path.join(dataPath, id+".json")
        let file = fs.readFileSync(filePath)
        let jokeJSON = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJSON)
        joke.likes++;
        fs.writeFileSync(filePath, JSON.stringify(joke))
        joke.id = id
        return res.end(JSON.stringify(joke))
    }
    res.statusCode = '400'
    return res.end("Bad request")
}

function Dislikes(req, res){
    const url = require('url')
    const params = url.parse(req.url, true).query;
    let id = params.id
    if(id){
        let filePath = path.join(dataPath, id+".json")
        let file = fs.readFileSync(filePath)
        let jokeJSON = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJSON)
        joke.dislikes++;
        fs.writeFileSync(filePath, JSON.stringify(joke))
    }
    res.end()
}