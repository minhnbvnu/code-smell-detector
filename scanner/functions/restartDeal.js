function restartDeal() {
    state.deal.pile.cards = state.deal.deal.cards;
    state.deal.deal.cards = [];

    for (const card of state.deal.pile.cards) {
        const { el } = getCard(card);
        faceDown(card);
        deckPileEl.appendChild(el);
    }
}