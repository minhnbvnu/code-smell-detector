function isReservedMemberName(name) {
                return name.charCodeAt(0) === 95 /* _ */ && name.charCodeAt(1) === 95 /* _ */ && name.charCodeAt(2) !== 95 /* _ */ && name.charCodeAt(2) !== 64 /* at */ && name.charCodeAt(2) !== 35 /* hash */;
            }