function bitRotateLeft(num, cnt) {
        return num << cnt | num >>> 32 - cnt;
      }