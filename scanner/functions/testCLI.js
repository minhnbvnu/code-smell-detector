function testCLI(id, options, testCallback) {
    it('[cli ' + id + '] ' + options.join(' '), function(mochaCallback) {

      var errors;
      var data;

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

      function unmockCLI() {
        cli.stdout = process.stdout;
        cli.stderr = process.stderr;
        // otherwise registered plugins would persist between runs
        plugins.unregisterAll();
      }

      try {

        mockCLI();
        cli.run(cli.parse(options));
        unmockCLI();

        if (cli.exitCode) {
          testCallback(new Error(errors));
        } else {
          testCallback(data);
        }

        mochaCallback();
      } catch (err) {
        unmockCLI();
        mochaCallback(err);
      }
    });
  }