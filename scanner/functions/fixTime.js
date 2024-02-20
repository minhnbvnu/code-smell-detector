function fixTime(time = '') {
        return time
            .split(/[:.]/)
            .map((item, index, arr) => {
                if (index === arr.length - 1) {
                    if (item.length === 1) {
                        return '.' + item + '00';
                    } else if (item.length === 2) {
                        return '.' + item + '0';
                    }
                } else {
                    if (item.length === 1) {
                        return (index === 0 ? '0' : ':0') + item;
                    }
                }

                return index === 0 ? item : index === arr.length - 1 ? '.' + item : ':' + item;
            })
            .join('');
    }