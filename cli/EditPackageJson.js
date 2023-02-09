const fs = require("fs");

const path = process.env.E2E_APP_PATH + '/package.json';

let data = JSON.parse(fs.readFileSync(path));

data.scripts.postinstall = "patch-package";

delete data['jest'];

fs.writeFileSync(path, JSON.stringify(data, null, 2));
