function str2ab(str) {
      const buff = new ArrayBuffer(str.length * 2);
      const view = new Uint16Array(buff);
      for ( let i=0, l=str.length; i<l; i++) {
        view[i] = str.charCodeAt(i);
      }
      return buff;
    }