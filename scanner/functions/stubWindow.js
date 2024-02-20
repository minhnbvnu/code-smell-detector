function stubWindow(eventType, data) {
  var iFrame = new MockEventSourceObject();

  if (eventType === 'message') {
    iFrame.assimilate({
      id: 'the_iframe',
      style: {}
    });
  } else if (eventType === 'load') {
    iFrame.assimilate({
      id: 'the_iframe',
      style: {},
      contentWindow: {
        location: {
          hash:
            data !== undefined
              ? data
              : '#access_token=VjubIMBmpgQ2W2&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6RTROMFpCTTBWRFF6RTJSVVUwTnpJMVF6WTFNelE0UVRrMU16QXdNRUk0UkRneE56RTRSZyJ9.eyJpc3MiOiJodHRwczovL3dwdGVzdC5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NTVkNDhjNTdkNWIwYWQwMjIzYzQwOGQ3IiwiYXVkIjoiZ1lTTmxVNFlDNFYxWVBkcXE4elBRY3VwNnJKdzFNYnQiLCJleHAiOjE0ODI5NjkwMzEsImlhdCI6MTQ4MjkzMzAzMSwibm9uY2UiOiJhc2ZkIn0.PPoh-pITcZ8qbF5l5rMZwXiwk5efbESuqZ0IfMUcamB6jdgLwTxq-HpOT_x5q6-sO1PBHchpSo1WHeDYMlRrOFd9bh741sUuBuXdPQZ3Zb0i2sNOAC2RFB1E11mZn7uNvVPGdPTg-Y5xppz30GSXoOJLbeBszfrVDCmPhpHKGGMPL1N6HV-3EEF77L34YNAi2JQ-b70nFK_dnYmmv0cYTGUxtGTHkl64UEDLi3u7bV-kbGky3iOOCzXKzDDY6BBKpCRTc2KlbrkO2A2PuDn27WVv1QCNEFHvJN7HxiDDzXOsaUmjrQ3sfrHhzD7S9BcCRkekRfD9g95SKD5J0Fj8NA&token_type=Bearer&refresh_token=kajshdgfkasdjhgfas'
        }
      }
    });
  }

  var fauxWindow = new MockEventSourceObject();
  fauxWindow.assimilate({
    mockObjectStore: {
      iframe: null
    },
    localStorage: {
      removeItem: function(key) {
        expect(key).to.be('com.auth0.auth.theState');
      },
      getItem: function(key) {
        expect(key).to.be('com.auth0.auth.theState');
        return JSON.stringify({
          nonce: 'asfd',
          appState: null
        });
      }
    },
    document: {
      createElement: function(element) {
        expect(element).to.be('iframe');
        return iFrame;
      },
      body: {
        appendChild: function(ele) {
          expect(fauxWindow.mockObjectStore.iframe).to.be(null);
          expect(ele.id).to.be(iFrame.id);
          fauxWindow.mockObjectStore.iframe = ele;
        }
      }
    }
  });

  sinon.stub(windowHelper, 'getWindow').callsFake(function() {
    return fauxWindow;
  });

  return iFrame;
}