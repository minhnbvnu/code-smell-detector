async function getVarsFromModal(varArray, promptText) {
        const template = `  
        <div id="var-modal" style="z-index: 100; background-color: rgb(0 0 0/.5)" class="fixed pg-outer items-center inset-0 flex items-center justify-center bg-opacity-50 z-100">
          <div class="fixed inset-0 z-10 overflow-y-auto pg-outer">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block pg-outer">
              <div style="width: 60%" class="dark:bg-gray-900 dark:text-gray-200 dark:border-netural-400 inline-block max-h-[ma400px] transform overflow-hidden rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:p-6 sm:align-middle" role="dialog">
            ${varArray
                .map(
                    variable => `
                <div class="text-sm font-bold text-black dark:text-gray-200">${variable}</div>
                <textarea style="border-color: #8e8ea0; height: 45px" class="pg-variable my-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-gray-800 dark:text-neutral-100" 
                placeholder="${chrome.i18n.getMessage(
                    "enter_val",
                )} ${variable}..." value=""></textarea>
                `,
                )
                .join("")}
                <button id="save-vars" type="button" class="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-gray-800">${chrome.i18n.getMessage(
                    "submit",
                )}</button>   
              </div>
            </div>
          </div>
        </div>
        `
        document.body.insertAdjacentHTML("beforeend", template)
        document.querySelector(".pg-variable").focus()
        function handleKeyDown(event) {
            if ((event.key === "Enter" || event.keyCode === 13) && !event.shiftKey) {
                submitModal()
                document.removeEventListener("keydown", handleKeyDown)
            }
        }

        function handleClick(e) {
            if (e.target.classList.contains("pg-outer")) {
                closeModal()
            }
        }

        function closeModal() {
            const modal = document.getElementById("var-modal")
            if (modal) modal.remove()
        }

        document.querySelectorAll(".pg-outer").forEach(div => {
            div.addEventListener("click", e => handleClick(e))
        })

        document.addEventListener("keydown", handleKeyDown)
        document.getElementById("save-vars").addEventListener("click", submitModal)
        function submitModal() {
            const varInputs = document.querySelectorAll(".pg-variable")
            let variables = []
            for (const varIn of varInputs) {
                variables.push(varIn.value)
            }
            document.getElementById("var-modal").remove()
            selectPrompt(replaceVariables(promptText, variables), false)
            setTimeout(() => chatInput.focus(), 80) // so not to add a newline
        }
    }