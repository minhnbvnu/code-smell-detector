function getPublicSearch() {
            new Promise((resolve, reject) => {
                ServiceTemplate.search(req.query.key, req.query.value, function (templates) {
                    if (templates.length == 0) {
                        reject('No published templates found with search criteria')
                    }
                    else {
                        resolve(templates);
                    }
                })
            })
                .then(templates => {
                    //filter for published templates
                    return new Promise((resolve, reject) => {
                        resolve(_.filter(templates, 'data.published'));
                    });
                })
                .then(templates => {
                    //Attach references to templates
                    return Promise.all(templates.map(template => {
                        return new Promise((resolve, reject) => {
                            template.attachReferences(updatedParent => {
                                resolve(updatedParent);
                            })
                        })
                    }))
                })
                .then(templates => {
                    //send response
                    res.json(templates.map(function (entity) {
                        delete entity.data.overhead;
                        return entity.data
                    }))
                })
                .catch(err => {
                    //send error response
                    console.error('Error with Get public templates request: ', err);
                    res.status(400).json({error: err});
                });
        }