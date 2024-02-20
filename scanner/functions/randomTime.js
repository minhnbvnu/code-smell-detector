function randomTime() {
  crypto.randomBytes(nanoPow/100, function(e, b) {
    if (e) throw e;
    last = (new Date()).getTime() - last;
    var seconds = last / 1000;
    process.stdout.write('above line took about ' + seconds.toFixed(4) + ' seconds\n');
    last = (new Date()).getTime();
    if (times--) setTimeout(randomTime, b.readUInt8(0) * 2);
  });
}