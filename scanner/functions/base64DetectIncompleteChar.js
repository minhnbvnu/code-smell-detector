function base64DetectIncompleteChar(buffer){this.charReceived=buffer.length%3;this.charLength=this.charReceived?3:0}