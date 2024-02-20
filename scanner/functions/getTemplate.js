function getTemplate(attendee = new Attendee()) {
    const speakerTemplate = attendee.isSpeaker ? speakericon : ""

    return `
    <div id="${attendee.id}" class="room-card__user">
        <div class="room-card__user__img">
        <img src="${attendee.img}" alt="${attendee.username}">
        </div>
        <p class="room-card__user__name">
        ${speakerTemplate}
        ${attendee.firstName}
        </p>
    </div>
    `;
}