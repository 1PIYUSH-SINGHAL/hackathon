import { TerminalEngine } from "./terminalEngine.js";

export class ScrollEngine {

  constructor({
    rulesSection,
    miniEventsSection,
    judgingSection,
    timelineSection,
    RULES,
    MINI_EVENTS,
    JUDGING,
    TIMELINE
  }) {
    this.rulesSection = rulesSection;
    this.miniEventsSection = miniEventsSection;
    this.judgingSection = judgingSection;
    this.timelineSection = timelineSection;

    this.RULES = RULES;
    this.MINI_EVENTS = MINI_EVENTS;
    this.JUDGING = JUDGING;
    this.TIMELINE = TIMELINE;

    this.rulesRendered = false;
    this.miniRendered = false;
    this.judgingRendered = false;
  }

  init() {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if (entry.target === this.rulesSection && entry.isIntersecting && !this.rulesRendered) {
            this.rulesRendered = true;
            this.renderRules();
          }

          if (entry.target === this.miniEventsSection && entry.isIntersecting && !this.miniRendered) {
            this.miniRendered = true;
            this.renderMiniEvents();
          }

          if (entry.target === this.judgingSection && entry.isIntersecting && !this.judgingRendered) {
            this.judgingRendered = true;
            this.renderJudgingAndThenTimeline();
          }

        });
      },
      { threshold: 0.35 }
    );

    observer.observe(this.rulesSection);
    observer.observe(this.miniEventsSection);
    observer.observe(this.judgingSection);
  }

  async renderRules() {

    const terminal = new TerminalEngine(this.rulesSection);
    terminal.setTypingSpeed(20);

    await terminal.printWithCursor("./event --load-rules", this.rulesSection);
    await terminal.printAsciiBlock(this.RULES, this.rulesSection);
  }

  async renderMiniEvents() {

    const terminal = new TerminalEngine(this.miniEventsSection);
    terminal.setTypingSpeed(20);

    await terminal.printWithCursor("./event --run-mini-events", this.miniEventsSection);

    let output;

    if (Array.isArray(this.MINI_EVENTS)) {

      output = `
starting runtime event scheduler...

${this.MINI_EVENTS.map(e =>
        `[${e.time}] ${e.name.padEnd(30)} .... queued`
      ).join("\n")}

scheduler active.
`;

    } else {
      output = this.MINI_EVENTS;
    }

    await terminal.printAsciiBlock(output, this.miniEventsSection);
  }

  async renderJudgingAndThenTimeline() {

    const judgingTerminal = new TerminalEngine(this.judgingSection);
    judgingTerminal.setTypingSpeed(8);

    await judgingTerminal.printWithCursor("./event --judge", this.judgingSection);

    const lines = this.JUDGING.split("\n");

    for (const line of lines) {
      await judgingTerminal.printWithCursor(line, this.judgingSection);
    }

    // Small pause for realism
    await new Promise(res => setTimeout(res, 200));

    // Now render timeline cleanly as ASCII block
    const timelineTerminal = new TerminalEngine(this.timelineSection);
    timelineTerminal.setTypingSpeed(18);

    await timelineTerminal.printWithCursor("./event --timeline", this.timelineSection);
    await timelineTerminal.printAsciiBlock(this.TIMELINE, this.timelineSection);
  }
}