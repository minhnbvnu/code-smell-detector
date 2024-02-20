function loadJs(src, callback = noop) {
    const ref = document.getElementsByTagName('script')[0]
    const script = document.createElement('script')
    script.src = src
    script.async = true
    ref.parentNode.insertBefore(script, ref)
    script.onload = callback
}