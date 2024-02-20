function releaseClassHandle($$) {
          $$.count.value -= 1;
          var toDelete = $$.count.value === 0;
          if (toDelete) {
            runDestructor($$);
          }
        }