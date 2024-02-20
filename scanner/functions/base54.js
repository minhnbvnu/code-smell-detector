function base54(num) {
                var ret = "", base = 54;
                num++;
                do {
                    num--;
                    ret += chars[num % base];
                    num = Math.floor(num / base);
                    base = 64;
                } while (num > 0);
                return ret;
            }