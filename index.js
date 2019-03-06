const dhcpd = require('dhcp');

const s = dhcpd.createServer({
  // System settings
  range: [
    "192.168.1.151", "192.168.1.250"
  ],
  forceOptions: ['hostname'], // Options that need to be sent, even if they were not requested
  randomIP: true, // Get random new IP from pool instead of keeping one ip
  static: {
    "A0-A8-CD-E0-AA-83": "192.168.1.100"
  },

  // Option settings (there are MUCH more)
  netmask: '255.255.255.0',
  router: [
    '192.168.1.150'
  ],
  dns: ["8.8.8.8", "8.8.4.4"],
  hostname: "amirashkan.ir",
  broadcast: '192.168.1.255',
  server: '192.168.1.150', // This is us
  bootFile: function (req, res) {

    // res.ip - the actual ip allocated for the client

    if (req.clientId === 'foo bar') {
      return 'x86linux.0';
    } else {
      return 'x64linux.0';
    }
  }
});

s.on('message', function (data) {
  console.log(data);
});

s.on('bound', function(state) {
  console.log("BOUND:");
  console.log(state);
});

s.on("error", function (err, data) {
  console.log(err, data);
});

s.on("listening", function (sock) {
  var address = sock.address();
  console.info('Server Listening: ' + address.address + ':' + address.port);
});

s.on("close", function () {
  console.log('close');
});

//s.listen(67 , "0.0.0.0");
s.listen();

process.on('SIGINT', () => {
    s.close();
});
