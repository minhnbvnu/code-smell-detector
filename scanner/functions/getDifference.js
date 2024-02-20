function getDifference(arrA, arrB) {
        return arrA.filter(a => !arrB.includes(a));
    }