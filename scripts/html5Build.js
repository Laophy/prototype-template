const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const packageJson = require("../package.json");

const APP_NAME = packageJson.name;
const VERSION = packageJson.version;
const BUILD_DIR = path.join(__dirname, "..", "production");
const TARGET_DIR = path.join(BUILD_DIR, `${APP_NAME}_${VERSION}_html5`);

// Ensure the production directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR);
}

// Remove existing directory if it exists
if (fs.existsSync(TARGET_DIR)) {
  fs.rmSync(TARGET_DIR, { recursive: true });
}

// Create the new directory
fs.mkdirSync(TARGET_DIR, { recursive: true });

// Copy build folder contents to the new directory
fs.cpSync(path.join(__dirname, "..", "build"), TARGET_DIR, { recursive: true });

console.log(`HTML5 build created successfully in: ${TARGET_DIR}`);

// Create a zip file of the build
const zipPath = `${TARGET_DIR}.zip`;
const output = fs.createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`ZIP archive created successfully: ${zipPath}`);
  console.log(`Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(TARGET_DIR, false);
archive.finalize();
