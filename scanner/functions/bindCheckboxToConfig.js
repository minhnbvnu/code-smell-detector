async function bindCheckboxToConfig(selector, config, configName) {
    const checkbox = document.querySelector(selector)
    checkbox.checked = await config.get(configName)
    checkbox.addEventListener("change", () => config.set(configName, checkbox.checked))
}