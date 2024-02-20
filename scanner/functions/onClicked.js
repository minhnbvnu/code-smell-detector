function onClicked(checked) {
            if (checked) {
                el.classList.add('active');
                el.closest('li').classList.add('active');
            } else {
                el.classList.remove('active');
                el.closest('li').classList.remove('active');
            }
        }