function initializeBotSystems(commitHash) {
            console.log('Bot is initialized. HEAD:', commitHash);
            considerExistence();

            // greet the other bots
            talk.speak();

            // Allow the voting system to bootstrap and begin monitoring PRs.
            repositories.forEach(voting.setup);
        }