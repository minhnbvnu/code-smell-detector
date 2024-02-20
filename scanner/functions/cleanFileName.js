function cleanFileName(name, fixCase=true) {
	// remove bad chars including /
	if (!(name = name.replace(/[\/\\:*?"<>|#]]+/ig, '')) || !fixCase) { return name; }
	let words = findWords(name), n = "", prev;
   for (let i=0; i<words.length; i++) {
      let word = words[i];
      if (!word) { continue; }
      // catch things like: ADBTester --> adb_tester instead of a_d_b_tester
      if (isSingleCap(word) && isSingleCap(prev)) { }
      else if (i > 0) { n += "_"; } 
      prev = word;
      n += word.toLowerCase();
   }
   return n;
}