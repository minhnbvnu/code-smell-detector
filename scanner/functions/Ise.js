function Ise(e,t,r,n,i,a){const l=this;let s=0,u;return c;function c(p){return e.enter(n),e.enter(i),e.consume(p),e.exit(i),e.enter(a),d}function d(p){return s>999||p===null||p===91||p===93&&!u||p===94&&!s&&"_hiddenFootnoteSupport"in l.parser.constructs?r(p):p===93?(e.exit(a),e.enter(i),e.consume(p),e.exit(i),e.exit(n),t):ft(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),f(p))}function f(p){return p===null||p===91||p===93||ft(p)||s++>999?(e.exit("chunkString"),d(p)):(e.consume(p),u||(u=!Ht(p)),p===92?h:f)}function h(p){return p===91||p===92||p===93?(e.consume(p),s++,f):f(p)}}