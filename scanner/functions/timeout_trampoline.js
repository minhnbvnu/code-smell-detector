function timeout_trampoline(t, timeout, message) {
      t.step_timeout(function () {
        // Yield in case we managed to be called before the second interval callback.
        t.step_timeout(function () {
          assert_unreached(message);
        }, timeout);
      }, timeout);
    }