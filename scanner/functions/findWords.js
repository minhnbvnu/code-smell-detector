function findWords(str) {
   if (!str) { return []; }
   let re = /[-A-Z_ ]/g, arr=[], i=0, o;
   while (o = re.exec(str)) {
      let c = o[0];
      pushNonEmpty(arr, str.slice(i, re.lastIndex-1));
      i = re.lastIndex-1;
      if (c === "-" || c === "_" || c === " ") { ++i; }
   }
   pushNonEmpty(arr, str.slice(i));
   return arr;
}