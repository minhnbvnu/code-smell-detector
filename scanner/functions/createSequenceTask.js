function createSequenceTask(expectedSequenceId) {
    return jest.fn(() => {
      expect(++sequenceId).toBe(expectedSequenceId);
    });
  }