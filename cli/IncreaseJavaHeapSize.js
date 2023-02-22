const fs = require("fs");

const path = process.env.E2E_APP_PATH + "/android/gradle.properties";

let text = fs.readFileSync(path, 'utf-8');

text = text.replace(/org\.gradle\.jvmargs=-Xmx(\d+)m/, 'org.gradle.jvmargs=-Xmx4096m');

fs.writeFileSync(path, text);
