function importScript(url) {
    return new Promise((resolve, reject) => {
        let s = document.createElement("script"); // Create a <script> element
        s.onload = () => { resolve(); };          // Resolve promise when loaded
        s.onerror = (e) => { reject(e); };        // Reject on failure
        s.src = url;                              // Set the script URL
        document.head.append(s);                  // Add <script> to document
    });
}