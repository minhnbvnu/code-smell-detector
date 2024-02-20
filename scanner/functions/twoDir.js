function twoDir(nested) {
    return filesMap('', [
        'lib1/file3.js',
        nested ? 'lib1/lib2/file4.js' : 'lib2/file4.js',
        'lib1/file2.js',
        nested ? 'lib1/lib2/file1.js' : 'lib2/file1.js'
    ]);
}