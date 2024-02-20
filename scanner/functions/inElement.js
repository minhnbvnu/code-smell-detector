function inElement(event, element) {
    const rect = element.getBoundingClientRect();
    if (element.style.transform === 'rotate(45deg)') {
        // Assume symmetrical
        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.5;
        return Math.abs(centerX - event.clientX) + Math.abs(centerY - event.clientY) < rect.width * 0.5;
    } else {
        return (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom);
    }
}