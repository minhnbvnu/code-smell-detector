function printMatrix( M ) { // used for debugging purposes only
      var n = Math.sqrt(M.length);
      for ( var i = 0; i < n; i++ ) {
        var row = '';
        for ( var j = 0; j < n; j++ ) {
          row += M[i*n+j] + ' ';
        }
        console.log(row);
      }
    }