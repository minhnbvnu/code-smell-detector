function endTest() {
        t.equal(hadExpect, 1)
        agent.getTransaction().end()
        helper.unloadAgent(agent)
        server.close(t.end())
      }