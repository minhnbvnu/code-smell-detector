function openDocument(id)
        {
            var doc = new Document();
            try {
                doc.open(id);
            }
            catch(e)
            {
                alert(e);
                return;
            }

            // Update icons and other user elements affected  alert("Doc id: " + doc.id());
            return doc;
        }