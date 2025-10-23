const fs = require('fs');

const input = JSON.parse(fs.readFileSync('openapi-full.json', 'utf8'));
const publicSpec = {
  ...input,
  paths: Object.fromEntries(
    Object.entries(input.paths).filter(([path]) =>
      ['/post/{id}', '/user/{id}/profile'].includes(path)
    )
  ),
};

publicSpec.info.title = "Content Moderation API - Public Documentation";
fs.writeFileSync('docs/openapi.json', JSON.stringify(publicSpec, null, 2));
console.log("✅ Public OpenAPI specification generated successfully.");
