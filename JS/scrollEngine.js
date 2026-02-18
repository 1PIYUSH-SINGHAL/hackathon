import { TerminalEngine } from "./terminalEngine.js";

export class ScrollEngine {

  constructor({ rulesSection, RULES }) {
    this.rulesSection = rulesSection;
    this.RULES = RULES;
    this.rendered = false;
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !this.rendered) {
            this.rendered = true;
            await this.renderRules();
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    observer.observe(this.rulesSection);
  }

  async renderRules() {
    const terminal = new TerminalEngine(this.rulesSection);
    terminal.setTypingSpeed(20);

    await terminal.printWithCursor("./event --load-rules", this.rulesSection);
    await terminal.printAsciiBlock(this.RULES, this.rulesSection);
  }
}