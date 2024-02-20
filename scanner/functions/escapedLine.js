function escapedLine(){
            try {
              return escaperName+'('+JSON.stringify(JSON.parse(line)) +')';
            } catch (e2) {
              return escaperName+'(' + line + ')';
            }
          }