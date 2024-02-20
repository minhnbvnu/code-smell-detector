function createImageAnimations(scrollTimeline, offsets, width) {
    const image_container = document.getElementById('images');

    // FIXME: I am a layout noob! I would have expected that image container
    // clientWidth is sum of width for all images but somehow the container size
    // is the same size as one image. So for now we do the math for 5 images.
    const containerWidth = (2 * 5) * image_container.clientWidth;
    const parallex_effect = new KeyframeEffect(
        image_container,
        { transform: ['translateX(0)', 'translateX(-' + containerWidth + 'px)'] },
        { duration: scrollTimeline.timeRange, iterations: 1, fill: "both" });

    new WorkletAnimation('passthrough', parallex_effect, scrollTimeline).play();


    const figures = image_container.querySelectorAll('figure');
    for (let i = 0; i < figures.length; i++) {
        const figure = figures[i];
        const img = figure.querySelector('img');

        const reveal_effect = new KeyframeEffect(
            figure,
            { transform: ['scale(0.5)', 'scale(1)'] },
            { duration: 100, iterations: 1, fill: "both", easing: 'linear'});
        const options = {
            start: offsets[i],
            width: width,
            inverse: false,
        };

        const inverse_reveal_effect = new KeyframeEffect(
            img,
            { transform: ['scale(1)', 'scale(2)'] },
            { duration: 1, iterations: 1, fill: "both", easing: 'linear'});

        const inverse_options = {
            start: offsets[i],
            width: width,
            inverse: true,
        };

        new WorkletAnimation('image_reveal', reveal_effect, scrollTimeline, options).play();
        new WorkletAnimation('image_reveal', inverse_reveal_effect, scrollTimeline, inverse_options).play();
    }

    // TODO: Create scale and counter-scale reveal animations for each image
}