function cutAndStripNonPairedParens(i,o){return")"===i[o]&&o++,stripNonPairedParens(i.slice(0,o))}