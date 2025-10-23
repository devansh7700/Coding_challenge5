const fs = require('fs');
const path = require('path');

const input = JSON.parse(fs.readFileSync('openapi-base.json', 'utf8'));
const outputDir = path.join(__dirname, '..', 'docs');

// ✅ Create docs folder if missing
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const publicSpec = {
  ...input,
  paths: Object.fromEntries(
    Object.entries(input.paths).filter(([path]) =>
      ['/post/{id}', '/user/{id}/profile'].includes(path)
    )
  ),
};

publicSpec.info.title = "Content Moderation API - Public Documentation";

fs.writeFileSync(
  path.join(outputDir, 'openapi.json'),
  JSON.stringify(publicSpec, null, 2)
);

console.log("✅ Public OpenAPI specification generated successfully.");