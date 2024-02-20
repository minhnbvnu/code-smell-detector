function canDo() {
            var now = Date.now();
            var flag = false;
            if (now - pasteTime >= 100) {
                // 间隔大于 100 ms ，可以执行
                flag = true;
            }
            pasteTime = now;
            return flag;
        }