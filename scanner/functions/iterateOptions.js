function iterateOptions() {
        for (const plugin of chart._plugins._init) {
          // triggering bug https://github.com/chartjs/Chart.js/issues/9368
          expect(Object.getPrototypeOf(plugin.options)).toBeNull();
        }
      }