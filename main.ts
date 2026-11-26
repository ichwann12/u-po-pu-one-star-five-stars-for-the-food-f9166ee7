import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");
const line = readFileSync(entryPath, "utf8").trim();

// Output dir precedence: MAKEFUN_OUTPUT_DIR first, then MAKEFUN_BOT_DIR,
// then a local fallback. In the grader MAKEFUN_BOT_DIR=/bot is read-only,
// so checking it first would die with EACCES and reject the submission.
const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  process.env.MAKEFUN_BOT_DIR ||
  join(scriptDir, "output");

mkdirSync(outputDir, { recursive: true });
// The entry line is written verbatim (plus a trailing newline) as output.txt.
writeFileSync(join(outputDir, "output.txt"), line + "\n", "utf8");
console.log(line);
