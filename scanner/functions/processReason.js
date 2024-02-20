function processReason(reason) {
                    (fileIncludeReasons || (fileIncludeReasons = [])).push(fileIncludeReasonToDiagnostics(program, reason));
                    if (!locationReason && isReferencedFile(reason)) {
                        locationReason = reason;
                    }
                    else if (locationReason !== reason) {
                        relatedInfo = append(relatedInfo, fileIncludeReasonToRelatedInformation(reason));
                    }
                    if (reason === fileProcessingReason)
                        fileProcessingReason = void 0;
                }