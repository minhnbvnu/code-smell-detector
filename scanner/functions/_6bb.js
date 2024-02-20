function _6bb(_6bc,down){
var opts=$(_6bc).spinner("options");
opts.spin.call(_6bc,down);
opts[down?"onSpinDown":"onSpinUp"].call(_6bc);
$(_6bc).spinner("validate");
}