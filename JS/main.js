import { runBootSequence } from "./boot.js";
import { TerminalEngine } from "./terminalEngine.js";
import { ScrollEngine } from "./scrollEngine.js";

import { EVENT_CONFIG } from "../DATA/eventConfig.js";
import { RULES } from "../DATA/rules.js";

document.addEventListener("DOMContentLoaded", async () => {

  await runBootSequence();

  const bootSection = document.getElementById("boot-section");
  const rulesSection = document.getElementById("rules-section");

  const terminal = new TerminalEngine(bootSection);
  terminal.setTypingSpeed(20);

  /* Boot Flow */

  await terminal.printWithCursor("g++ -std=c++20 event.cpp -o event", bootSection);
  await terminal.printWithCursor("./event --show-config", bootSection);
  await terminal.printAsciiBlock(EVENT_CONFIG, bootSection);

  /* Prepare Scroll Engine */

  const scroll = new ScrollEngine({
    rulesSection,
    RULES
  });

  scroll.init();
});