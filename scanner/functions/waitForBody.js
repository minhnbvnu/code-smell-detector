function waitForBody()
    {
        if (document.body)
            createFrame();
        else
            setTimeout(waitForBody, 200);
    }