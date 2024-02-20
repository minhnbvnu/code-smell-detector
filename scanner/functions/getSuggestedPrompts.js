function getSuggestedPrompts(searchTerm) {
        let filtered = prompts.filter(prompt =>
            prompt.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        // Sort the filtered prompts - thanks gpt-4
        if (searchTerm !== "") {
            filtered.sort((a, b) => {
                const aTitle = a.title.toLowerCase()
                const bTitle = b.title.toLowerCase()
                const searchTermLower = searchTerm.toLowerCase()

                if (aTitle.startsWith(searchTermLower) && !bTitle.startsWith(searchTermLower)) {
                    return -1
                } else if (
                    !aTitle.startsWith(searchTermLower) &&
                    bTitle.startsWith(searchTermLower)
                ) {
                    return 1
                } else {
                    return aTitle.localeCompare(bTitle)
                }
            })
        }

        const html = `
        <div id="suggestions" class="w-full suggestions" style="position: relative">
            <ul id="scrollSuggest" class="rounded bg-white dark:bg-gray-700" style="border-color: rgba(0,0,0,.1); border-width: 1px; font-size: .875rem; line-height: 1.25rem; color: rgb(255 255 255); box-sizing: border-box; list-style: none; margin: 0; padding: 0; z-index: 1; max-height: 13rem; width: 100%; overflow: auto; ">
                ${filtered
                    .map(
                        (prompt, idx) => `
                <li data-idx="${idx}" data-prompt-id4="${prompt.id}" class="cursor-pointer dark:bg-gray-700 pg-suggestion px-3 py-2 text-sm text-black dark:text-white">${prompt.title}</li>
                `,
                    )
                    .join("")}
            </ul>
        </div>
        `
        textDiv.parentElement.insertAdjacentHTML("beforebegin", html)
        const suggestions = document.querySelectorAll(".pg-suggestion")
        suggestions.forEach(s =>
            s.addEventListener("mouseenter", () => focusEl(s.getAttribute("data-idx"))),
        )
        suggestions.forEach(s =>
            s.addEventListener("mouseup", () =>
                selectPrompt(
                    prompts.find(prompt => prompt.id === s.getAttribute("data-prompt-id4"))?.text,
                ),
            ),
        )
    }