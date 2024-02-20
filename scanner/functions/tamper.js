function tamper(str, index, mask) {
              const arrayStr = ethers.getBytes(str);
              arrayStr[index] ^= mask;
              return ethers.hexlify(arrayStr);
            }