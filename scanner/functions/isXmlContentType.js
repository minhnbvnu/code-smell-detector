function isXmlContentType(contentType) {
    return (
        !contentType ||
        /(text\/xml)|(application\/xml)|(\+xml)/.test(contentType)
    );
}