function createFeaturedSpeakersTemplate(featuredAttendees) {
    if(!featuredAttendees.length) return '';

    const attendees = featuredAttendees.map((attende) => {
        return `
               <li>${attende.username} <span role="img" class="emoji">💬</span></li>
            `
    })

    return attendees.join('')
}