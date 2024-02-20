function verifyMultipleResolvedPath(codePathInfo, promiseCodePathContext) {
      for (const { node, resolved, kind } of codePathInfo.iterateReports(
        promiseCodePathContext
      )) {
        report(node, resolved, kind)
      }
    }