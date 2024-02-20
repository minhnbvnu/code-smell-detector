async function keypadEntry({page}, str) {
    for (const number of str) {
        await delay(1000)
        await page.click(`.component-call-keypad .test-key-${number}`)
    }
}