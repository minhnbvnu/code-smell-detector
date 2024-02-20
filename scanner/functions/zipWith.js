function zipWith(arrayA, arrayB, callback) {
            const result = [];
            Debug.assertEqual(arrayA.length, arrayB.length);
            for (let i = 0; i < arrayA.length; i++) {
                result.push(callback(arrayA[i], arrayB[i], i));
            }
            return result;
        }