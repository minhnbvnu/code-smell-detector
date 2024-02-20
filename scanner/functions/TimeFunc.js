function TimeFunc(func) {
var x, y, t;
for(var x=0; x<350; x++)
for(var y=0; y<256; y++) func(y);
}