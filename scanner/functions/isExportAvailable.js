function isExportAvailable() {
    return tryThis('export default function foo() {}', 'export', true);
}