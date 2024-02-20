function verifyCallbackWasExecutedForEachAttendee(attendeeArray) {
      // 각 원소마다 한번씩 스파이가 호출되었는지 확인한다
      expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

      // 각 호출마다 spy에 전달한 첫 번째 인자가 해당 attendee인지 확인한다
      let allCalls = callbackSpy.calls.all();
      for (let i = 0; i < allCalls.length; i++) {
        expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
      }
    }