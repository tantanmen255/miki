var ws = require("nodejs-websocket")
var conn = ws.connect("wss://real.okex.com:10440/websocket/okexapi");
var fs = require('fs');
setTimeout(function(){
  console.log(111);
  conn.send("{'event':'addChannel','channel':'ok_sub_futureusd_eth_ticker_quarter'}");
  conn.send("{'event':'addChannel','channel':'ok_sub_futureusd_eth_ticker_this_week'}");
  conn.send("{'event':'addChannel','channel':'ok_sub_futureusd_eth_ticker_next_week'}");
},2000);

conn.on('text',function(tickerdatastr){
  var tickerdata = eval('('+tickerdatastr+')');
  console.log(tickerdata);
});


var gkey = fs.readFileSync('./gkey.txt','utf-8');

function sign(param){

}


