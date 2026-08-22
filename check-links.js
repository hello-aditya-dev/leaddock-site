const fs = require("fs");
const path = require("path");
let bad = 0;
let checked = 0;
for (const f of fs.readdirSync(".").filter((x) => x.endsWith(".html"))) {
  const html = fs.readFileSync(f, "utf8");
  const re = /(?:href|src)="(\/[^"#]*)"/g;
  let m;
  while ((m = re.exec(html))) {
    checked++;
    let p = m[1].split("?")[0];
    p = p === "/" ? "index.html" : p.replace(/^\//, "");
    const asIs = fs.existsSync(path.join(".", p));
    const asHtml = fs.existsSync(path.join(".", p + ".html"));
    if (!asIs && !asHtml) {
      console.log("BROKEN:", f, "->", m[1]);
      bad++;
    }
  }
}
console.log(`${checked} internal links checked across all pages.`);
console.log(bad === 0 ? "ALL LINKS OK" : `FAILURES: ${bad}`);
process.exit(bad === 0 ? 0 : 1);
