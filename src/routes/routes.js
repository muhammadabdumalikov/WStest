const Fs = require("fs");
const Path = require("path");

const homedir = Path.resolve();

function router(app) {
    // Get Router and run || Custom GLOB collector
    try {
        return new Promise((resolve, reject) => {
            const routerDirectory = Path.join(homedir, "src", "routes");
            Fs.readdir(routerDirectory, async (err, routeFiles) => {
                if (err) throw new Error("Routes path not found");

                for await (let routeName of routeFiles) {
                    const routeFile = Path.join(
                        homedir,
                        "src",
                        "routes",
                        routeName
                    );
                    // console.log(routeFile)
                    const route = require(routeFile);
                    if (route.path && route.router) {
                        app.use(route.path, route.router);
                    }
                }

                resolve(200);
            });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;
