
const { v1: uuidv1 } = require('uuid');  

const projectRoutes = (app, fs) => {

    // variables
    const dataPath = './projects.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ ALL PROJECTS
    app.get('/projects', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // READ SPECIFIC PROJECT
    app.get('/projects/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            //project ID
            const projectId = req.params["id"];

            res.send(JSON.parse(data)[projectId]);
        });
    });

    // READ PROJECTS TASKS
    app.get('/projects/:id/tasks', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            //project ID
            const projectId = req.params["id"];

            res.send(JSON.parse(data)[projectId]["tasks"]);
        });
    });

    // CREATE NEW PROJECT
    app.post('/projects', (req, res) => {

        readFile(data => {
            const newProjectId = Object.keys(data).length + 1;

            // add the new project
            data[newProjectId.toString()] = req.body;
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new project added');
            });
        },
            true);
    });


    // UPDATE PROJECT
    app.put('/projects/:id', (req, res) => {

        readFile(data => {

            // add the new project
            const projectId = req.params["id"];
            data[projectId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`projects id:${projectId} updated`);
            });
        },
            true);
    });

    // DELETE PROJECT
    app.delete('/projects/:id', (req, res) => {

        readFile(data => {

            // add the new project
            const projectId = req.params["id"];
            delete data[projectId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`projects id:${projectId} removed`);
            });
        },
            true);
    });

    
    // READ TASKS OF SPECIFIC PROJECT
    app.get('/tasks/:projectId', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            //project ID
            let projectId = req.params["projectId"];
            if (projectId == undefined) {
                projectId = 0;
            }

            res.send(JSON.parse(data)[projectId]["tasks"]);
        });
    });


    // ADD NEW task- if @projectId not specified, add to inbox
    app.post('/tasks/:projectId', (req, res) => {

        readFile(data => {
            
            let projectId = req.params["projectId"];
            const taskId = uuidv1();

            if (projectId == undefined) {
                projectId = 0;
            }
            
            const l = data[projectId]["tasks"].length;
            if (l == 0) {
                data["0"]["tasks"] = []
            }
            data[projectId]["tasks"].push(req.body);
            data[projectId]["tasks"][l]["isDone"] = false;
            data[projectId]["tasks"][l]["taskId"] = taskId;
            //data[projectId]["tasks"][l]["createdAt"] = 0;
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`new task added id:${taskId}`);
            });
        },
            true);
    });

    //find task within a specific project
    const findTaskHelper = (data, projectId, taskId) => {
        const l = data[projectId]["tasks"].length;
        for (var i = 0; i < l; i++){
            if ( data[projectId]["tasks"][i]["taskId"] == taskId ) {
                return i;
            }
        }
        return -1;
    }

    // DELETE task from a specific project
    app.delete('/tasks/:projectId/:taskId', (req, res) => {

        readFile(data => {
            let message = '';
            const taskId = req.params["taskId"];
            const projectId = req.params["projectId"];
            const taskIndexInProject = findTaskHelper(data, projectId, taskId);

            if (taskIndexInProject == -1) {
                message = 'not found';
            } else {
                delete data[projectId]["tasks"][taskIndexInProject];
                message = `tasks id:${taskId} removed from project ${projectId}`;
            }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(message);
            });
        },
            true);
    });

    // UPDATE task
    app.put('/tasks/:projectId/:taskId', (req, res) => {

        readFile(data => {
            const taskId = req.params["taskId"];
            const projectId = req.params["projectId"];
            const taskIndexInProject = findTaskHelper(data, projectId, taskId);

            if (taskIndexInProject == -1) {
                message = 'not found';
            } else {
                data[projectId]["tasks"][taskIndexInProject]["name"] = req.body.name;
                data[projectId]["tasks"][taskIndexInProject]["isDone"] = req.body.isDone;
                data[projectId]["tasks"][taskIndexInProject]["priority"] = req.body.priority;
                data[projectId]["tasks"][taskIndexInProject]["dueDate"] = req.body.dueDate;
                message = `tasks id:${taskId} updated from project ${projectId}`;
                //moving task into different project
                if (req.body.project_Id !== undefined) {
                    data[projectId]["tasks"][taskIndexInProject]["project_Id"] = req.body.project_Id;
                    data[req.body.project_Id]["tasks"].push(data[projectId]["tasks"][taskIndexInProject]);
                    delete data[projectId]["tasks"][taskIndexInProject];
                }
            }
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(message);
            });
        },
            true);
    });
};

module.exports = projectRoutes;

