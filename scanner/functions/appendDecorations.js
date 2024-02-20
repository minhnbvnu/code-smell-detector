function appendDecorations(
        sourceNode, basePos, sourceCode, langHandler, out) {
        if (!sourceCode) { return; }
        /** @type {JobT} */
        var job = {
          sourceNode: sourceNode,
          pre: 1,
          langExtension: null,
          numberLines: null,
          sourceCode: sourceCode,
          spans: null,
          basePos: basePos,
          decorations: null
        };
        langHandler(job);
        out.push.apply(out, job.decorations);
      }