function scanForProtectedKeys(file, obj, attrPath) {
            let count = 0
            Object.entries(obj).forEach(([key, value]) => {
                if (protectedKeys.includes(key) && value) {
                    const attr = [...attrPath, key].join('.')
                    console.log(`Secret leaking: ${file.path} in attr ${attr}`)
                    count++
                } else if (Array.isArray(value)) {
                    value.map(([index, subvalue]) => {
                        count += scanForProtectedKeys(file, subvalue, [...attrPath, key, index])
                    })
                } else if (value !== null && (typeof value) === 'object') {
                    count += scanForProtectedKeys(file, value, [...attrPath, key])
                }
            })

            return count
        }