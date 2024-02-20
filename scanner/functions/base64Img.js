function base64Img(data) {
          var arr = new Uint8Array(data);
          var raw = '';
          var i, j, subArray, chunk = 5000;
          for (i = 0, j = arr.length; i < j; i += chunk) {
            subArray = arr.subarray(i, i + chunk);
            raw += String.fromCharCode.apply(null, subArray);
          }
          return btoa(raw);
        }