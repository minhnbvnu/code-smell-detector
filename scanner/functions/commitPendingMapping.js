function commitPendingMapping() {
                if (!hasPending || !shouldCommitMapping()) {
                    return;
                }
                enter();
                if (lastGeneratedLine < pendingGeneratedLine) {
                    do {
                        appendMappingCharCode(59 /* semicolon */);
                        lastGeneratedLine++;
                    } while (lastGeneratedLine < pendingGeneratedLine);
                    lastGeneratedCharacter = 0;
                }
                else {
                    Debug.assertEqual(lastGeneratedLine, pendingGeneratedLine, "generatedLine cannot backtrack");
                    if (hasLast) {
                        appendMappingCharCode(44 /* comma */);
                    }
                }
                appendBase64VLQ(pendingGeneratedCharacter - lastGeneratedCharacter);
                lastGeneratedCharacter = pendingGeneratedCharacter;
                if (hasPendingSource) {
                    appendBase64VLQ(pendingSourceIndex - lastSourceIndex);
                    lastSourceIndex = pendingSourceIndex;
                    appendBase64VLQ(pendingSourceLine - lastSourceLine);
                    lastSourceLine = pendingSourceLine;
                    appendBase64VLQ(pendingSourceCharacter - lastSourceCharacter);
                    lastSourceCharacter = pendingSourceCharacter;
                    if (hasPendingName) {
                        appendBase64VLQ(pendingNameIndex - lastNameIndex);
                        lastNameIndex = pendingNameIndex;
                    }
                }
                hasLast = true;
                exit();
            }