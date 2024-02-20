function sectionNavigation(sectionIndex) {
    const sectionName = websiteData.sections[sectionIndex]?.name

    pageAnimation()

    const attemptedSection = document.querySelector(`[value="section_${sectionIndex + 1}"]`)
    if (attemptedSection && sectionName) {
        attemptedSection.focus()
        document.forms["nav_form"][sectionName].checked = true
    }

    websiteData.sections.forEach((section, index) => {
        const sectionContainer = document.querySelector(`#section_${index + 1}`)
        sectionContainer.classList.remove("visible")
        if (index == sectionIndex) {
            sectionContainer.classList.add("visible")
        }
    })
    main.style.transform = `translate(0)`
    navForm.style.transform = `translate(0)`
    keySection.style.transform = `translate(0)`
    websiteData.pushPage.coordinates.x = 0
    websiteData.pushPage.coordinates.y = 0
    websiteData.pushPage.scale = 1
}