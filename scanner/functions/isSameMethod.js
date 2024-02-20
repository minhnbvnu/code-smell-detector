function isSameMethod(method1, method2) {
                return (!!method2 &&
                    method1.name === method2.name &&
                    method1.static === method2.static &&
                    method1.callSignature === method2.callSignature &&
                    method1.type === method2.type);
            }