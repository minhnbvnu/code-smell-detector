function applyDecorator(job) {
        var opt_langExtension = job.langExtension;

        try {
          // Extract tags, and convert the source code to plain text.
          var sourceAndSpans = extractSourceSpans(job.sourceNode, job.pre);
          /** Plain text. @type {string} */
          var source = sourceAndSpans.sourceCode;
          job.sourceCode = source;
          job.spans = sourceAndSpans.spans;
          job.basePos = 0;

          // Apply the appropriate language handler
          langHandlerForExtension(opt_langExtension, source)(job);

          // Integrate the decorations and tags back into the source code,
          // modifying the sourceNode in place.
          recombineTagsAndDecorations(job);
        } catch (e) {
          if (win['console']) {
            console['log'](e && e['stack'] || e);
          }
        }
      }