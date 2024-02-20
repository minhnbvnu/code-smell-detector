function nextQuestion(correct, answer, wrongAnswer, pointerType) {
    // console.log(pointerType)
    const scoreTally = document.querySelector("#score_tally")
    const allQuestions = document.querySelectorAll(".question_container")
    let answerFeedback

    if (correct) score++

    allQuestions.forEach((question, index) => {
        const wrongCharacter = question.querySelector(".wrong_character")

        if (index == currentQuestion) {
            question.classList.add("active_question")
            const rightButton = question.querySelector(`.button_container .question_button:nth-child(${answer + 1})`)
            const wrongButton = question.querySelector(
                `.button_container .question_button:nth-child(${wrongAnswer + 1})`,
            )
            correct ? rightButton.classList.add("button_choice") : wrongButton.classList.add("button_choice")
            !correct ? rightButton.classList.add("button_choicent") : wrongButton.classList.add("button_choicent")
            rightButton.classList.add("right_button")
            rightButton.tabIndex = -1
            wrongButton.classList.add("wrong_button")
            wrongButton.tabIndex = -1

            answerFeedback = question.querySelector(".answer_feedback")
            answerFeedback.textContent = correct ? "✓" : "✕"

            wrongCharacter.classList.remove("hide_character")
            wrongCharacter.classList.add("show_character")
        } else if (index == currentQuestion + 1) {
            question.classList.add("active_question")
        } else {
            question.classList.remove("active_question")
        }
    })

    currentQuestion++

    allQuestions.forEach((question, index) => {
        if (index == currentQuestion) {
            question.querySelectorAll(".question_button").forEach((button) => (button.tabIndex = 0))
        }
    })
    scoreTally.textContent = `Score: ${score}/${gtc.length}`

    if (currentQuestion < gtc.length) {
        if (!isMobile && pointerType === "") setTimeout(() => firstButtons[currentQuestion]?.focus(), 10)
    } else {
        scoreTally.tabIndex = 0
        setTimeout(() => scoreTally.focus(), 10)
    }
}