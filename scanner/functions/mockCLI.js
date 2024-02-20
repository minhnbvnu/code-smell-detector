function mockCLI() {
        errors = '';
        data = '';

        cli.stdout = {
          write: function(msg) {
            data += msg;
          }
        };
        cli.stderr = {
          write: function(msg) {
            errors += msg;
          }
        };
      }