var ws = require("nodejs-websocket")
var conn = ws.connect("wss://real.okex.com:10440/websocket/okexapi");
setTimeout(function(){
  console.log(111);
  conn.send("{'event':'addChannel','channel':'ok_sub_futureusd_eth_ticker_quarter'}");
},2000);

conn.on('text',function(tickerdatastr){
  var tickerdata = eval('('+tickerdatastr+')');
  console.log(tickerdata);
});


