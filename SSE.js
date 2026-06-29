const http = require("http")

async function BTCInfo() {
    try {
        const result = await fetch("https://api.api-ninjas.com/v1/bitcoin", {
            headers: {
                'X-Api-Key': '<YOUR_API_KEY>',
                'Content-Type': 'application/json'
            }
        })
        const data = await result.json()
        return data
    }
    catch (err) {
        console.log("Error occur while fetching BTC Info !", err)
    }
}

const server = http.createServer(async (req, res) => {
    if (req.url == "/BTC") {

        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        });

        const interval = setInterval(async () => {
            const data = await BTCInfo()
            res.write(`Current BTC Info ${JSON.stringify(data)}\n`)
        }, 5000)

        req.on("close", () => {
            clearInterval(interval);
            res.end();
        });
    }
    else {
        res.end(JSON.stringify({
            message: 'Something went wrong. Please try again !',
        }));
    }
})

server.listen(3000, () => {
    console.log(`server is listening on http://localhost:3000/`)
})

