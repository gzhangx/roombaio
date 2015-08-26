var SerialPort = require('serialport').SerialPort;
var sleep = require('sleep');

console.log('here');
//var sp = new SerialPort("/dev/ttyAMA0", {baudrate: 19200});
var sp = new SerialPort("/dev/ttyAMA0", {baudrate: 115200});


var steps = {
  commands : [128, 131, 139, 255,255,255,7,255,255,255],
  step: 0, 
};
console.log('there');
sp.on("open", function(error){
  console.log('open ');
  sp.on('data', function(data) {
   console.log('data received : ' + data);
  });
  console.log('open '+error);
  sp.write([128], function(err, res) {
  console.log('write error '+err + " " + res);
    console.log('wrote 128');
sleep.usleep(200000);
    
    var doSeq = function(err, res) {
       console.log('doSeq at '+steps.step);
       if (steps.step >= steps.commands.length ) {
          console.log('last step, closing ');
          sp.close(function(error) {
            sleep.usleep(500000);
            console.log('closing ' + error);
          });
       }else {
         console.log('doSeq at '+steps.step+ ' cmd ' + steps.commands[steps.step]);
         sp.write(steps.commands[steps.step++], doSeq);
         sleep.usleep(500000);
       }
    };


    sp.write([143], doSeq);
  });
sleep.usleep(20000);
  console.log('done write');
  console.log('closed');
});

/*
var ssp = require('serialport');
ssp.list(function(err, ports) {
  console.log('listed port ' + err+ ' ' + ports);
  for (var i in ports){
console.log('ports i' + i);
    var port = ports[i];
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacture);
  }
});
*/
