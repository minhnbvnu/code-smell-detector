function safegetzipfile(zip,file){var f=file;if(zip.files[f])return zip.files[f];f=file.toLowerCase();if(zip.files[f])return zip.files[f];f=f.replace(/\//g,"\\");if(zip.files[f])return zip.files[f];return null}