function stats() {

        var container = $("<div/>").addClass("detail"),
            runningTimeSpan = $("<span/>", {text: "running time: 0min"}),
            assertionsSpan = $("<div/>", {text: "facts asserted: 0"}),
            modifiesSpan = $("<div/>", {text: "facts modified: 0"}),
            retractionsSpan = $("<div/>", {text: "facts retracted: 0"}),
            firesSpan = $("<span/>", {text: "rules fired: 0"});
        var currDiv = $("<div/>");
        runningTimeSpan.appendTo(currDiv);
        currDiv.appendTo(container);
        currDiv = $("<div/>");
        var inlineDiv = $("<div/>").addClass("inline");
        assertionsSpan.appendTo(inlineDiv);
        retractionsSpan.appendTo(inlineDiv);
        modifiesSpan.appendTo(inlineDiv);
        firesSpan.appendTo(inlineDiv);
        inlineDiv.appendTo(currDiv);
        currDiv.appendTo(container);
        container.appendTo("body");
        var transCum = 0,
            aTime = new Date(),
            assertions = 0,
            retractions = 0,
            modified = 0,
            fires = 0,
            currSession;

        function updateAssertions() {
            ++assertions;
        }

        function updateModified() {
            ++modified;
        }

        function updateRetractions() {
            ++retractions;
        }

        function updateFires() {
            aTime = aTime || new Date();
            var btime = new Date();
            var deltaTime = btime - aTime;
            transCum = transCum + deltaTime;
            aTime = btime;
            ++fires;
        }

        setInterval(function () {
            runningTimeSpan.text("running time:" + Math.round(transCum / 1000 / 60) + "min");
            firesSpan.text('rules fired: : ' + fires);
            retractionsSpan.text('facts retracted: ' + retractions);
            modifiesSpan.text('facts modified: ' + modified);
            assertionsSpan.text('facts asserted: ' + assertions);
        }, (1000 / 2));

        return {
            listen: function (session) {
                if (currSession) {
                    currSession
                        .removeListener("assert", updateAssertions)
                        .removeListener("retract", updateRetractions)
                        .removeListener("modify", updateModified)
                        .removeListener("fire", updateFires);
                }
                return (currSession = session)
                    .on("assert", updateAssertions)
                    .on("retract", updateRetractions)
                    .on("modify", updateModified)
                    .on("fire", updateFires);
            }
        }
    }