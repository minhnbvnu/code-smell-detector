function loadOpenCV(onComplete) {
    if (loadedOpenCV) {
        onComplete()
    } else {
        $('#demo-result').text('Loading OpenCV...')
        const script = document.createElement("script")
        script.src = openCvURL

        script.onload = function () {
            setTimeout(function () {
                onComplete()
            }, 1000)
            loadedOpenCV = true
        }
        document.body.appendChild(script)
    }
}