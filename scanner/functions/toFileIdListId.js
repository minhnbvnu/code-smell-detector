function toFileIdListId(set) {
                const fileIds = arrayFrom(set.keys(), toFileId).sort(compareValues);
                const key = fileIds.join();
                let fileIdListId = fileNamesToFileIdListId == null ? void 0 : fileNamesToFileIdListId.get(key);
                if (fileIdListId === void 0) {
                    (fileIdsList || (fileIdsList = [])).push(fileIds);
                    (fileNamesToFileIdListId || (fileNamesToFileIdListId = /* @__PURE__ */ new Map())).set(key, fileIdListId = fileIdsList.length);
                }
                return fileIdListId;
            }