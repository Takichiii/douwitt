// import other routes
const projectRoutes = require('./projects');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('Hello from Douwitt api-server ! 🐱‍🏍💕🎉');
    });

    // // other routes
    projectRoutes(app, fs);

};

module.exports = appRouter;