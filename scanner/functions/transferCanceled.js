function transferCanceled() {
      reject({
        cancelled: true,
        message: `Cancelled download of ${url}`
      });
    }