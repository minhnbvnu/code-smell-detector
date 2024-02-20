function completeWriting(destination) {
              if (currentView && writtenBytes > 0) {
                destination.enqueue(new Uint8Array(currentView.buffer, 0, writtenBytes));
                currentView = null;
                writtenBytes = 0;
              }
            }