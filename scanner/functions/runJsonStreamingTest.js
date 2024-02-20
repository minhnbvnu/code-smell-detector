function runJsonStreamingTest(t, len, sep = '') {
  const async = t.startAsync(`test_json_streaming: len = ${len} sep = "${sep}"`);

  const objects = [];
  for (let n = 0; n < len; n += 1) {
    objects.push({
      stringWithTabsAndNewlines: "Did it work?\nNo...\t\tI don't think so...",
      anArray: [n + 1, n + 2, true, 'tabs?\t\t\t\u0001\u0002\u0003', false],
      n
    });
  }

  let json = [];
  for (let n = 0; n < objects.length; n += 1) {
    json.push(JSON.stringify(objects[n]));
  }

  const input = json.join(sep);
  const pipeline = new ReadString(input, 4).pipe(new Parser({jsonStreaming: true}));
  const assembler = Assembler.connectTo(pipeline);

  assembler.on('done', asm => {
    const {current: obj} = asm;
    const {n} = obj;
    eval(t.TEST('t.unify(obj, objects[n])'));
  });

  pipeline.on('end', () => {
    async.done();
  });
}