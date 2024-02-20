function switchTab(index) {
      let tab = tabs[index];
      let type = tab.parentElement.dataset.tab;
      localStorage.setItem('kontra-example-type', type);
      document.body.setAttribute('data-examples', type);

      let priorTab = tablist.querySelector('[aria-selected]');
      priorTab.removeAttribute('aria-selected');
      priorTab.setAttribute('tabindex', -1);

      tab.setAttribute('aria-selected', true);
      tab.focus();
      tab.setAttribute('tabindex', 0);
    }