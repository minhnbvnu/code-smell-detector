function getLineEndings(buffer) {
  if (typeof buffer.find === 'function') {
    return Promise.all([buffer.find(LFRegExp), buffer.find(CRLFRegExp)]).then(
      ([hasLF, hasCRLF]) => {
        const result = new Set();
        if (hasLF) result.add('\n');
        if (hasCRLF) result.add('\r\n');
        return result;
      }
    );
  } else {
    return new Promise(resolve => {
      const result = new Set();
      for (let i = 0; i < buffer.getLineCount() - 1; i++) {
        result.add(buffer.lineEndingForRow(i));
      }
      resolve(result);
    });
  }
}