function emitPlaceholder(hint, node, snippet) {
                nonEscapingWrite(`\${${snippet.order}:`);
                pipelineEmitWithHintWorker(hint, node, 
                /*allowSnippets*/
                false);
                nonEscapingWrite(`}`);
            }