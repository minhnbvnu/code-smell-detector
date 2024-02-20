function getFallbackPoolUrl(package) {
    const poolUrl = config.poolUrlFallback[package];
    console.log (`(*) Fallback pool URL for ${package} is ${poolUrl}`);
    return poolUrl;
}