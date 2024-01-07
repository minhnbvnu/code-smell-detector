function getImage(resources, url) {
    const img = resources && resources.getImage(url);
    return img || null;
}