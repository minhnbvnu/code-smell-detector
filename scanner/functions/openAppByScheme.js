function openAppByScheme(scheme) {
    if (isIos) {
        location.href = scheme
    } else {
        var iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = scheme
        document.body.appendChild(iframe)
        setTimeout(function() {
            iframe && iframe.parentNode && iframe.parentNode.removeChild(iframe)
        }, 2000)
    }
}