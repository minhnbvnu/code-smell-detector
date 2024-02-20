function checkFinalState() {
  function sum(a) {
    var result = 0;
    for (var i = 0; i < a.length; i++) {
      result += a[i];
    }
    return result;
  }
  var state = {
    registerA: gameboy.registerA,
    registerB: gameboy.registerB,
    registerC: gameboy.registerC,
    registerE: gameboy.registerE,
    registerF: gameboy.registerF,
    registersHL: gameboy.registersHL,
    programCounter: gameboy.programCounter,
    stackPointer: gameboy.stackPointer,
    sumROM : sum(gameboy.fromTypedArray(gameboy.ROM)),
    sumMemory: sum(gameboy.fromTypedArray(gameboy.memory)),
    sumMBCRam: sum(gameboy.fromTypedArray(gameboy.MBCRam)),
    sumVRam: sum(gameboy.fromTypedArray(gameboy.VRam))
  }
  var stateStr = JSON.stringify(state);
  if (typeof expectedGameboyStateStr != "undefined") {
    if (stateStr != expectedGameboyStateStr) {
      alert("Incorrect final state of processor:\n" +
            " actual   " + stateStr + "\n" +
            " expected " + expectedGameboyStateStr);
    }
  } else {
    alert(stateStr);
  }
}