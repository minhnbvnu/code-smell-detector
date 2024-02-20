function createRowAnimations(row_container) {
    const row = row_container.querySelector('.row');
    const icon = row_container.querySelector('.icon');
    const entry = row.querySelector('.entry');
    // scroll  little bit to trigger initial snapping.
    row.scrollTo(1, 0);

    const scrollRange = row.scrollWidth - row.clientWidth;
    const scrollTimeline = new ScrollTimeline({ scrollSource: row, orientation: 'inline', timeRange: scrollRange });

    const iconLeft = icon.offsetLeft;
    const iconTop = icon.offsetTop;

    // Set threshold at 40%.
    const threshold = entry.clientWidth * 0.4;
    const options = {
        start: entry.offsetLeft,
        width: threshold,
    };

    const scale_effect = new KeyframeEffect(
        icon.querySelector('svg'),
        {
            transform: ['scale(0.5)', 'scale(1)'],
            opacity: [0, 1]
        },
        { duration: 50, delay: 50, iterations: 1, fill: 'both', easing: 'linear' });

    const scale_options = {
        ...options,
        play_when_favorited: false, // ensure effect is played when swiping right
    };

    const background_scale_effect = new KeyframeEffect(
        row_container.querySelector('.bg'),
        {
            transform: ['scale(0.5)', 'scale(40)'],
            opacity: [0, 1]
        },
        { duration: 70, delay: 30, iterations: 1, fill: 'both', easing: 'linear' });

    const background_scale_options = {
        ...options,
        play_when_favorited: false,
    };

    const transform_effect = new KeyframeEffect(
        icon,
        {
            transform: [`translate(-${iconLeft}px, -${iconTop}px) scale(1)`, 'translate(0,0) scale(1)'],
        },
        { duration: 100, iterations: 1, easing: 'linear' });

    const transform_options = {
        ...options,
        play_when_favorited: true,
    };

    new WorkletAnimation('icon_effect', scale_effect, scrollTimeline, scale_options).play();
    new WorkletAnimation('icon_effect', background_scale_effect, scrollTimeline, background_scale_options).play();
    new WorkletAnimation('icon_effect', transform_effect, scrollTimeline, transform_options).play();
}