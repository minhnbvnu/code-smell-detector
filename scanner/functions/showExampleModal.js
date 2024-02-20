function showExampleModal() {
  showModal(({dismiss}) => {
    return (
      <div>
        <div>
          I'm a modal. You can add any content you like. I have all the standard
          behavior, like obeying the "core:cancel" command!
        </div>
        <Button onClick={dismiss}>Hide Modal</Button>
      </div>
    );
  });
}