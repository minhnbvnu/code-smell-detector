function getCardList() {
    const list = [];

    document.querySelectorAll('.card__wrapper').forEach(card => {
        const title = card.querySelector('.card__title a').textContent;
        const href = card.querySelector('.card__button-wrapper a').href;
        const desc = card.querySelector('.card__description').textContent;
        list.push({ title, href, desc });
    });

    return list;
}