function killAll() {
      childProcesses.forEach(child => {
        if (!child.killed) {
          child.kill()
        }
      })
    }