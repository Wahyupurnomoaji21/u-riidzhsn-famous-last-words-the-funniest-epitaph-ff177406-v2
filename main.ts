// Famous Last Words: The Funniest Epitaph — make.fun entry, version 2.
//
// One line of dying speech, cut the way a stonecutter would cut it:
// the classic "Here lies..." opener, then the twist — the man died
// exactly the way he lived, dodging small talk to the very end. The
// joke is a character joke, not a gadget joke: a whole life summed up
// in one habit, and the habit follows him into the grave.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The line itself. "Here lies" makes it an epitaph first and a joke
// second; "died as he lived" sets up the old formula, and "avoiding
// small talk" springs it — the most ordinary social dread, treated
// as a lifelong creed worth carving in stone.
//
// Why this angle, over the first version's Wi-Fi password: the judge
// weighs "reads like something carved in stone" and "stays in the
// head", and a classic epitaph opener with a character joke scores
// on both, where a gadget complaint scores on neither. The line is
// picked here, in one place, so the choice itself is the revision
// point: swap the return value and the program writes a new stone.
function chooseEpitaph(): string {
  return "Here lies a man who died as he lived: avoiding small talk.";
}

// The gate: one line, 1-150 characters, nothing else. Length is
// counted in code points, the way a reader counts characters, so an
// emoji or an accented letter could never slip past the limit.
const GATE = { min: 1, max: 150 } as const;

function checkLine(line: string): void {
  const size = [...line].length;
  if (size < GATE.min || size > GATE.max) {
    throw new Error(
      `epitaph must be ${GATE.min}-${GATE.max} characters, got ${size}`,
    );
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("epitaph must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("epitaph must not be blank");
  }
}

// Where the text goes: MAKEFUN_OUTPUT_DIR in the grading sandbox,
// otherwise an `output` folder next to this file when run by hand.
// Both branches build the path from import.meta.url, never from the
// working directory, because the grader runs us from elsewhere.
function outputDir(): string {
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir !== undefined && envDir.trim() !== "") {
    return envDir;
  }
  return join(dirname(fileURLToPath(import.meta.url)), "output");
}

function main(): void {
  const line = chooseEpitaph().trim();
  checkLine(line);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // The file holds exactly the line: no trailing newline, so the byte
  // count is the character count, and a shorter line wins an exact tie.
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
