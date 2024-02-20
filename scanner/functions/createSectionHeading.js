function createSectionHeading(title) {
        var heading = document.createElement('label');
        heading.className = 'few-shot-section-heading';
        heading.textContent = title;
        return heading;
    }