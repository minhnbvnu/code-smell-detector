function componentNormalizer(component) {
    if (component.markdownIgnore ||component.MarkdownIgnore ) {
        return null;
    }
    let componentType = component.Component.Type;
    // Handle capitalization differences
    if (!component.Component[componentType]) {
        componentType = componentType[0].toUpperCase() + componentType.substr(1);
    }
    const componentInfo = component.Component[componentType];
    return {
        name: componentInfo.Name,
        url: componentInfo.DownloadUrl,
        version: componentInfo.Version
    }
}