function dealCards() {
    let card = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            const last = getLastOnDesk(j);
            if (last !== null) {
                appendToCard(last, card)
            } else {
                appendToDesk(j, card);
            }

            placeCardTo('desk', j, card);

            if (j === i) {
                faceUp(card);
            }
            card++;
        }
    }
}