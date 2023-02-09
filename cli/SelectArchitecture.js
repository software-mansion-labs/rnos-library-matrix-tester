const fs = require("fs");

const path = process.env.E2E_APP_PATH + "/android/gradle.properties";

let text = fs.readFileSync(path, 'utf-8');

const value = process.env.E2E_ARCHITECTURE === 'Fabric' ? 'true' : 'false';

text = text.replace(/newArchEnabled=(false|true)/, 'newArchEnabled=' + value);

fs.writeFileSync(path, text);
