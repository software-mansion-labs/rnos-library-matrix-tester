const fs = require("fs");

const path = process.env.E2E_APP_PATH + '/package.json';

let data = JSON.parse(fs.readFileSync(path));

delete data['jest'];

fs.writeFileSync(path, JSON.stringify(data, null, 2));
