function exitJS(status, implicit) {
          EXITSTATUS = status;
          if (!implicit) {
            if (ENVIRONMENT_IS_PTHREAD) {
              exitOnMainThread(status);
              throw "unwind";
            }
          }
          _proc_exit(status);
        }