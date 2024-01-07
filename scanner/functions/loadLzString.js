function loadLzString() {
    if (!lzStringPromise) {
      lzStringPromise = new Promise(function (resolve, reject) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js';
        document.head.append(script);
        script.addEventListener('load', resolve);
        script.addEventListener('error', reject);
      });
    }
    return lzStringPromise;
  }