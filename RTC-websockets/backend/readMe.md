Socket {
  _events: {
    error: [Function: noop]
  },
  _eventsCount: 1,
  _maxListeners: undefined,

  nsp: Namespace {
    _events: {
      connection: [Function]
    },
    sockets: Map(1) {
      "czyvNrbxR-nEEfzZAAAB" => [Circular]
    },
    name: "/",

    server: Server {
      _path: "/socket.io",
      opts: {
        cors: {
          origin: "http://localhost:5175"
        }
      },
      sockets: [Namespace],
      eio: [Server],
      httpServer: [Server],
      engine: [Server]
    },

    adapter: Adapter {
      rooms: Map(1) {
        "czyvNrbxR-nEEfzZAAAB" => Set(...)
      },
      sids: Map(1) {
        "czyvNrbxR-nEEfzZAAAB" => Set(...)
      }
    }
  },

  client: Client {
    id: "CbhUBg9PE1g6gBc0AAAA",

    sockets: Map(1) {
      "czyvNrbxR-nEEfzZAAAB" => [Circular]
    },

    nsps: Map(1) {
      "/" => [Circular]
    },

    conn: Socket {
      id: "CbhUBg9PE1g6gBc0AAAA",
      remoteAddress: "::1",
      protocol: 4,
      upgraded: false,
      transport: Polling {},
      pingIntervalTimer: Timeout {...}
    }
  },

  recovered: false,
  connected: true,
  data: {},
  acks: Map(0) {},
  fns: [],
  flags: {},

  id: "czyvNrbxR-nEEfzZAAAB",

  handshake: {
    headers: {
      host: "localhost:3000",
      connection: "keep-alive",

      origin: "http://localhost:5175",
      referer: "http://localhost:5175/",

      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",

      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7",
      "accept-encoding": "gzip, deflate, br, zstd",

      "sec-ch-ua":
        "\"Google Chrome\";v=\"149\", \"Chromium\";v=\"149\", \"Not)A;Brand\";v=\"24\"",

      "sec-ch-ua-platform": "\"Windows\"",
      "sec-ch-ua-mobile": "?0",

      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty"
    },

    time: "Tue Jun 30 2026 12:14:00 GMT+0530 (India Standard Time)",

    address: "::1",
    secure: false,
    xdomain: true,

    issued: 1782801840726,

    url:
      "/socket.io/?EIO=4&transport=polling&t=a6o8jwcy",

    query: {
      EIO: "4",
      transport: "polling",
      t: "a6o8jwcy"
    },

    auth: {}
  },

  server: Server {
    _path: "/socket.io",
    opts: {
      cors: {
        origin: "http://localhost:5175"
      }
    },

    eio: Server {
      clientsCount: 1
    },

    httpServer: Server {
      _connections: 2,
      timeout: 0,
      keepAliveTimeout: 5000
    }
  },

  adapter: Adapter {
    rooms: Map(1) {
      "czyvNrbxR-nEEfzZAAAB" => Set(...)
    },

    sids: Map(1) {
      "czyvNrbxR-nEEfzZAAAB" => Set(...)
    }
  }
}