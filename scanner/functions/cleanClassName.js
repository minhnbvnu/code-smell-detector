function cleanClassName(name, fixCase=true) {
	if (!fixCase) { return cleanDartName(name); }
	let words = findWords(name), n = "";
   for (let i=0; i<words.length; i++) {
      let word = words[i];
      if (!word) { continue; }
      n += word[0].toUpperCase() + word.slice(1);
   }
   return cleanDartName(n);
}