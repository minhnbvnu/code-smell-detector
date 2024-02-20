function streamInContent() {
      let temp = document.createElement('div');
      temp.innerHTML = finalHTML;
      let finalSuspenseNode = temp.firstChild.firstChild;
      let fallbackContent = suspenseNode.nextSibling;
      let finalContent = finalSuspenseNode.nextSibling;
      suspenseNode.parentNode.replaceChild(finalContent, fallbackContent);
      suspenseNode.data = '$';
      if (suspenseNode._reactRetry) {
        suspenseNode._reactRetry();
      }
    }