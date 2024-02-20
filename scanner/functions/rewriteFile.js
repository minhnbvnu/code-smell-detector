function rewriteFile(args) {
    args.path = args.path || process.cwd();
    var fullPath = path.join(args.path, args.file);

    args.haystack = fs.readFileSync(fullPath, 'utf8');
    var body = rewrite(args);

    fs.writeFileSync(fullPath, body);
}