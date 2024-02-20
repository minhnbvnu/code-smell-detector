function Mandreel_checkState() {
  var sum = 0;
  for (var i = 0; i < heap32.length; i += 100) {
    sum = (sum * 3 + heap32[i]) & 0xFFFFFF;
  }
  if (sum != 8001026) {
    alert("Check sum mismatch: expected ???, actual " + sum);
  }
}