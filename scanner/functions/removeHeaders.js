function removeHeaders(response) {
    const { responseHeaders: origHeaders } = response
    const blacklistedHeaders = [
        "Content-Security-Policy",
        "X-XSS-Protection",
        "X-Frame-Options",
        "X-Content-Type-Options"
    ]
    const newHeaders = origHeaders.filter(({ name }) => {
        return !blacklistedHeaders.includes(name)
    })
    return { responseHeaders: newHeaders }
}