function appendBuffers({ done, value }) {
          if (done) {
            mp4boxfile.flush();
            return null;
          }

          const buf = value.buffer;
          buf.fileStart = offset;
          offset += buf.byteLength;
          mp4boxfile.appendBuffer(buf);

          return reader.read().then(appendBuffers);
        }