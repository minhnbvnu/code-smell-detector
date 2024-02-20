function isImportAvailable() {
    return tryThis('import fs from "fs"', 'import', true);
}