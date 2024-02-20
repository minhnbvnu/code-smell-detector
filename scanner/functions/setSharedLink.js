function setSharedLink(id) {
    // Set the shared ID in the URL
    let url = new URL(window.location.href);
    if (id !== undefined && id !== null) {
        url.searchParams.set('shared', id);
    } else {
        url.searchParams.delete('shared');
    }
    window.history.replaceState({}, '', url);
}