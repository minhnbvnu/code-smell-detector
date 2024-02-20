function initSolitaire() {

    const backStyleIndex = Math.floor(Math.random() * 12) + 1;
    document.body.style.setProperty(
        "--background-position-facing-down",
        `${cardWidth * -backStyleIndex}px ${cardHeight * -4}px`
    );

    // create all cards
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            const el = document.createElement('div');
            el.classList.add(
                'card',
                `card--${state.types[i]}-${j}`,
                'card--back'
            );
            el.style.setProperty(
                "--background-position-facing-up",
                `${cardWidth * -(j - 1)}px ${cardHeight * -i}px`
            );


            state.cards.push({
                el: el,
                type: state.types[i],
                number: j,
                facingUp: false
            });
        }
    }

    // create aces decks
    for (let i = 0; i < 4; i++) {
        const el = document.createElement('div');
        el.classList.add(
            'aces',
            `aces--${i}`
        );
        state.finish.push({
            el: el,
            cards: []
        });
        upperContainerEl.appendChild(el);
    }

    // create desk decks
    for (let i = 0; i < 7; i++) {
        const el = document.createElement('div');
        el.classList.add(
            'seven',
            `seven--${i}`
        );
        state.desk.push({
            el: el,
            cards: []
        });
        deskContainerEl.appendChild(el);
    }

    dealPileEl.onclick = restartDeal;
    window.onpointermove = handleMove;
    window.onpointerup = releaseMove;

    resetGame();
}