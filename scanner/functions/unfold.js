function unfold(input) {
      let result = [];

      subject._eachLine(input, function(err, line) {
        result.push(line);
      });

      return result;
    }