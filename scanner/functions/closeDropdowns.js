function closeDropdowns() {
    const list = document.getElementsByClassName('dropdown');
    for (let i = 0; i < list.length; ++i) {
        list[i].style.visibility = 'hidden';
    }
}