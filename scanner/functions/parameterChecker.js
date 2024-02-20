function parameterChecker(args) {
    if (!args.dataSource) {
      throwError('"dataSource" is required.');
    }

    if (typeof args.dataSource === 'string') {
      if (args.totalNumberLocator === undefined) {
        if (args.totalNumber === undefined) {
          throwError('"totalNumber" is required.');
        } else if (!isNumeric(args.totalNumber)) {
          throwError('"totalNumber" is incorrect. Expect numberic type');
        }
      } else {
        if (typeof args.totalNumberLocator !== 'function') {
          throwError('"totalNumberLocator" should be a Function.');
        }
      }
    } else if (Helpers.isObject(args.dataSource)) {
      if (typeof args.locator === 'undefined') {
        throwError('"dataSource" is an Object, please specify a "locator".');
      } else if (typeof args.locator !== 'string' && typeof args.locator !== 'function') {
        throwError('' + args.locator + ' is incorrect. Expect string or function type');
      }
    }

    if (args.formatResult !== undefined && typeof args.formatResult !== 'function') {
      throwError('"formatResult" should be a Function.');
    }

    if (args.onError !== undefined && typeof args.onError !== 'function') {
      throwError('"onError" should be a Function.');
    }
  }