function openModelFile()
{
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.ncft,.json,application/json,application/JSON';

    input.onchange = (e) =>
    {
        if (!e || !e.target || !e.target.files)
            return;

        let file = e.target.files[0];
        if (!file)
            return;

        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = (e) =>
        {
            if (!e || !e.target)
                return;

            try
            {
                importModel(e.target.result);
            }
            catch (error)
            {
                errorDialog("Failed to load project file.");
            }

            // Clear any hash tag in the URL
            history.replaceState(null, null, ' ');
        }
    };

    input.click();
}