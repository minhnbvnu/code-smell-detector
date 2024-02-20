async function buildModelResources() {
    let models = [
        require("../models/charge"),
        require("../models/event-log"),
        require("../models/file"),
        require("../models/fund"),
        require("../models/invitation"),
        require("../models/invoice-line"),
        require("../models/notification-template"),
        require("../models/notifications"),
        require("../models/password-reset-request"),
        require("../models/permission"),
        require("../models/role"),
        require("../models/service-category"),
        require("../models/service-instance"),
        require("../models/service-instance-cancellation"),
        require("../models/service-instance-message"),
        require("../models/service-instance-property"),
        require("../models/service-template-property"),
        require("../models/service-template"),
        require("../models/system-options"),
        require("../models/transaction"),
        require("../models/user"),
        require("../models/base/entity")("webhooks"),
        require("../models/base/entity")("user_permissions")
    ];
    let swaggerResources = {};

    for (let model of models) {
        swaggerResources[model.table] = await buildSwagger(model);
    }

    fs.writeFile('swagger.json', JSON.stringify(swaggerResources), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('defs saved!');
    });

}