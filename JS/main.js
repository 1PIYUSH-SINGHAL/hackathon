import { runBootSequence } from "./boot.js";
import { TerminalEngine } from "./terminalEngine.js";
import { ScrollEngine } from "./scrollEngine.js";

import { EVENT_CONFIG } from "../DATA/eventConfig.js";
import { RULES } from "../DATA/rules.js";
import { WORKSHOPS } from "../DATA/workshops.js";
import { MINI_EVENTS } from "../DATA/miniEvents.js";
import { JUDGING } from "../DATA/judging.js";
import { TIMELINE } from "../DATA/timeline.js";
import { REGISTRATION } from "../DATA/registration.js";

document.addEventListener("DOMContentLoaded", async () => {

  await runBootSequence();

  const bootSection = document.getElementById("boot-section");

  const terminal = new TerminalEngine(bootSection);
  terminal.setTypingSpeed(20);

  /* ========================= */
  /* CONFIG */
  /* ========================= */

  await terminal.printWithCursor(
    "g++ -std=c++20 event.cpp -o event",
    bootSection
  );

  await terminal.printWithCursor("./event --show-config", bootSection);
  await terminal.printAsciiBlock(EVENT_CONFIG, bootSection);

  /* ========================= */
  /* WORKSHOPS */
  /* ========================= */

  await terminal.printWithCursor("./event --init-workshops", bootSection);

  const workshopBlock = `
initializing workshop modules...

${WORKSHOPS.map(w =>
    `[✓] ${w.title.padEnd(40)} | ${w.timing}`
  ).join("\n")}

modules loaded successfully.
`;

  await terminal.printAsciiBlock(workshopBlock, bootSection);

  /* ========================= */
  /* SCROLL ENGINE */
  /* ========================= */

  const scroll = new ScrollEngine({
    rulesSection: document.getElementById("rules-section"),
    miniEventsSection: document.getElementById("mini-events-section"),
    judgingSection: document.getElementById("judging-section"),
    timelineSection: document.getElementById("timeline-section"),
    registrationSection: document.getElementById("registration-section"),
    RULES,
    MINI_EVENTS,
    JUDGING,
    TIMELINE,
    REGISTRATION
  });

  scroll.init();
});