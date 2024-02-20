function unescapedLine(){
            try {
              return parse_interpol(JSON.parse(line));
            } catch (e) {
              return line;
            }
          }