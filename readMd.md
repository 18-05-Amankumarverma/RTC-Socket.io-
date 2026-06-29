# Real Time Communication (RTC)

Real-time communication is a method of communication in which data is exchanged between two or more devices instantly or with very little delay.

### Types of way to make RTC Connections
1. Polling
2. Server Side Events
3. Web Socket

## Pooling

Polling is a communication technique in which client repeatedly sends requests to the server at fixed time intervals to check for new data.

### Client-side Polling (Most Common)

> The browser asks the server every 3 seconds.

<pre>
<code>

setInterval(async () => {
    const response = await fetch("http://localhost:3000/matchScore");
    const data = await response.json();
    console.log(data);
}, 3000);
</code>
</pre>


Client
   │
   ├── GET /matchScore ─────► Server
   │◄──── Latest Score ──────┘
   │
(wait 3 sec)
   │
   ├── GET /matchScore ─────► Server
   │◄──── Latest Score ──────┘


<pre>
<code>
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
            "Content-Type": "application/json",
        });

        const data = await BTCInfo()

        res.end(JSON.stringify({
            message: data,
        }));
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


</code>
</pre>


## SSE

SSE keeps a single HTTP connection open indefinitely using the **text/event-stream** content type. The server streams updates down to the client continuously. If the client needs to talk back, it must issue a brand new, separate HTTP request (like a POST or PUT)

<pre>
<code>
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

</code>
</pre>

#### Then on client side write this CODE

<pre>
<code>
const source = new EventSource("/events");

source.addEventListener("scoreUpdate", (event) => {
    console.log(JSON.parse(event.data));
});
</code>
</pre>