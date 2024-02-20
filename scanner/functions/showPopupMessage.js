function showPopupMessage(msgHTML) {
    const element = document.getElementById('popupMessage');
    element.innerHTML = msgHTML;
    element.classList.add('show');

    setTimeout(
        function () { element.classList.remove('show'); },
        
        // This timeout value has to be slightly less than the sum of the times
        // in the quadplay.css #popupMessage.show animation
        // property
        4000);
}