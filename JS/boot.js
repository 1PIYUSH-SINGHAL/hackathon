import { TerminalEngine } from "./terminalEngine.js";
import { $ } from "./utils.js";
import { ASCII_LOGO } from "../DATA/asciiArt.js";

export const runBootSequence = async () => {
  const section = $("#boot-section");
  const terminal = new TerminalEngine(section);

  terminal.setTypingSpeed(12);

  await terminal.printOutput("welham.dev v1.0.0", section, true);
  await terminal.printOutput(
    "----------------------------------------",
    section,
  );

  await terminal.printOutput(
    "initializing hackathon environment...",
    section,
    true,
  );
  await terminal.printOutput("loading participant registry...", section, true);
  await terminal.printOutput("verifying git protocol...", section, true);
  await terminal.printOutput("ai modules............. disabled", section, true);
  await terminal.printOutput("commit discipline...... enforced", section, true);

  await terminal.printOutput(
    "----------------------------------------",
    section,
  );
  await terminal.printOutput("launching hackathon@welham", section, true);

  await terminal.printAsciiBlock(ASCII_LOGO, section);

  await terminal.printCommand("help", section);
};
