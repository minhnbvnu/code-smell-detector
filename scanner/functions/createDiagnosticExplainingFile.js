function createDiagnosticExplainingFile(file, fileProcessingReason, diagnostic, args) {
                var _a3;
                let fileIncludeReasons;
                let relatedInfo;
                let locationReason = isReferencedFile(fileProcessingReason) ? fileProcessingReason : void 0;
                if (file)
                    (_a3 = fileReasons.get(file.path)) == null ? void 0 : _a3.forEach(processReason);
                if (fileProcessingReason)
                    processReason(fileProcessingReason);
                if (locationReason && (fileIncludeReasons == null ? void 0 : fileIncludeReasons.length) === 1)
                    fileIncludeReasons = void 0;
                const location = locationReason && getReferencedFileLocation(getSourceFileByPath, locationReason);
                const fileIncludeReasonDetails = fileIncludeReasons && chainDiagnosticMessages(fileIncludeReasons, Diagnostics.The_file_is_in_the_program_because_Colon);
                const redirectInfo = file && explainIfFileIsRedirectAndImpliedFormat(file);
                const chain = chainDiagnosticMessages(redirectInfo ? fileIncludeReasonDetails ? [fileIncludeReasonDetails, ...redirectInfo] : redirectInfo : fileIncludeReasonDetails, diagnostic, ...args || emptyArray);
                return location && isReferenceFileLocation(location) ? createFileDiagnosticFromMessageChain(location.file, location.pos, location.end - location.pos, chain, relatedInfo) : createCompilerDiagnosticFromMessageChain(chain, relatedInfo);
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
            }