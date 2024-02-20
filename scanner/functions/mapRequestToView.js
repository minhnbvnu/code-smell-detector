function mapRequestToView(viewRoot, req) {
    // Remove leading "/"
    const relativePath = req.path.substring(1);

    if (!relativePath.endsWith(".html")) {
        return null;
    }

    view = path.resolve(viewRoot, relativePath);

    return view;
}