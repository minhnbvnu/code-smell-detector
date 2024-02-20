function alertResolutionToARC(resolution) {
    if (resolution === null) {
        return '';
    }
    switch (resolution.resolution_status_name) {
        case 'True Positive With Impact':
            return `<span class="badge alert-bade-status badge-pill badge-danger mr-2">True Positive with impact</span>`
        case 'True Positive Without Impact':
            return `<span class="badge alert-bade-status badge-pill badge-warning mr-2">True Positive without impact</span>`
        case 'False Positive':
            return `<span class="badge alert-bade-status badge-pill badge-success mr-2">False Positive</span>`
        case 'Unknown':
            return `<span class="badge alert-bade-status badge-pill badge-light mr-2">Unknown resolution</span>`
    }
}