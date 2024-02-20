function checkTutorialKeys(e) {
    if (!tutorialFinished) {
        websiteData.tutorial.forEach((key) => {
            if (e.key == key) {
                if (e.key == "Enter") {
                    if (document.activeElement.dataset.edit == "true") {
                        document.querySelector(".key_code_Enter")?.classList.add("pressed_key")
                    }
                } else if (e.key != "Escape") {
                    let keyNode
                    if (key != "+") keyNode = document.querySelector(`.key_code_${key}`)
                    if (key == "+") keyNode = document.querySelector(".key_code_plus")
                    if (key == "-") keyNode = document.querySelector(".key_code_minus")
                    keyNode?.classList.add("pressed_key")
                }
            }
        })
        const numnerOfTutorialKeys = document.querySelectorAll(".tutorial_key").length
        const numberOfPressedKeys = document.querySelectorAll(".tutorial_key.pressed_key").length

        if (numnerOfTutorialKeys === numberOfPressedKeys) {
            // console.log("TUTORIAL FINISHED!!")
            tutorialFinished = true
            const tutorialContainer = document.querySelector("#tutorial_complete")
            tutorialContainer.innerHTML = `<p>Tutorial complete! Your present is the variable version of Commit Mono:</p>
<p><a href="/src/fonts/fontlab/CommitMonoV143-VF.ttf" tabindex="0">Download CommitMono-VF.ttf</a></p>
<p><a href="/src/fonts/fontlab/CommitMonoV143-VF.woff2" tabindex="0">Download CommitMono-VF.woff2</a></p>
<br />`
        }
    }
}