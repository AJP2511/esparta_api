const app = require("./src/server/server");
require("./src/server/database");
require("./src/routes/routes")(app);
