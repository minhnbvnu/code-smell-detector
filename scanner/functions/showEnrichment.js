function showEnrichment(enrichment) {
    const ace = get_new_ace_editor('enrichmentData', null,
        null, null, null, true, false);
    ace.session.setMode("ace/mode/json");
    ace.setValue(JSON.stringify(enrichment, null, 4), -1);
}