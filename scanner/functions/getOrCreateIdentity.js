async function getOrCreateIdentity(color) {
    const name = `PwnFox-${color}`
    const icon = "fingerprint"
    const [identity] = await browser.contextualIdentities.query({ name })
    if (identity !== undefined) {
        return identity
    }
    return await browser.contextualIdentities.create({ name, color, icon })
}