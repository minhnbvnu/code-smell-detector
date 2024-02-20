async function onSubscribed() {
        try {
          // execute
          if (!executing) {
            executing = true;
            await self.__openAuthClient.post({
              path: '/a/cli/cli/execute',
              body: {
                progressId,
                context,
              },
            });
            return true;
          }
          return false;
        } catch (err) {
          // force close and destroy
          onDestroy()
            .then(() => {
              // reject
              reject(err);
            })
            .catch(() => {
              reject(err);
            });
          return true;
        }
      }