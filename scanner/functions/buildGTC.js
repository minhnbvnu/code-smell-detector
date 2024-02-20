function buildGTC() {
    // console.log("buildGTC")
    const gtcContainer = document.querySelector("#gtc_questions_container")
    gtcContainer.innerHTML = ""
    answers = []
    score = -1
    currentQuestion = -1
    firstButtons = []
    gtc.forEach((question, index) => {
        const div = document.createElement("div")
        div.classList.add("question_container")
        div.dataset.index = index

        const answer = Math.round(Math.random())
        const wrongAnswer = (answer + 1) % 2
        answers.push(answer)

        const p = document.createElement("p")
        p.classList.add("question_character")
        p.textContent = question.value[answer]
        const pWrong = document.createElement("p")
        pWrong.classList.add("question_character", "wrong_character", "hide_character")
        pWrong.textContent = question.value[wrongAnswer]
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button_container")
        const option0 = document.createElement("button")
        option0.classList.add("question_button")
        option0.textContent = question.options[0]
        option0.dataset.questionIndex = index
        option0.tabIndex = -1
        firstButtons.push(option0)
        const option1 = document.createElement("button")
        option1.classList.add("question_button")
        option1.textContent = question.options[1]
        option1.dataset.questionIndex = index
        option1.tabIndex = -1

        const options = [option0, option1]
        options[answer].addEventListener("click", (e) => nextQuestion(true, answer, wrongAnswer, e.pointerType))
        options[wrongAnswer].addEventListener("click", (e) => nextQuestion(false, answer, wrongAnswer, e.pointerType))

        const answerFeedback = document.createElement("p")
        answerFeedback.classList.add("answer_feedback")

        buttonContainer.append(option0, option1)
        const br = document.createElement("br")
        div.append(answerFeedback, p, buttonContainer, pWrong)
        gtcContainer.append(div)
    })
    nextQuestion(true, 0, 1)
}