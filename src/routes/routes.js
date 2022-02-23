const Fs = require("fs");
const Path = require("path");

const homedir = Path.resolve();

module.exports = function (app) {
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
                    const route = await import(`file://${routeFile}`);
                    if (route.default.path && route.default.router) {
                        app.use(route.default.path, route.default.router);
                    }
                }

                resolve(200);
            });
        });
    } catch (error) {
        console.log(error);
    }
}
