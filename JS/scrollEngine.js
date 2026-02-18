import { TerminalEngine } from "./terminalEngine.js";

export class ScrollEngine {
  constructor({
    rulesSection,
    miniEventsSection,
    judgingSection,
    timelineSection,
    registrationSection,
    RULES,
    MINI_EVENTS,
    JUDGING,
    TIMELINE,
    REGISTRATION,
  }) {
    this.rulesSection = rulesSection;
    this.miniEventsSection = miniEventsSection;
    this.judgingSection = judgingSection;
    this.timelineSection = timelineSection;
    this.registrationSection = registrationSection;

    this.RULES = RULES;
    this.MINI_EVENTS = MINI_EVENTS;
    this.JUDGING = JUDGING;
    this.TIMELINE = TIMELINE;
    this.REGISTRATION = REGISTRATION;

    this.rulesRendered = false;
    this.miniRendered = false;
    this.judgingRendered = false;
    this.registrationRendered = false;

    this.renderChain = Promise.resolve();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.target === this.rulesSection &&
            entry.isIntersecting &&
            !this.rulesRendered
          ) {
            this.rulesRendered = true;

            this.renderChain = this.renderChain.then(async () => {
              await this.renderRules();
              await new Promise((res) => setTimeout(res, 300));
            });
          }

          if (
            entry.target === this.miniEventsSection &&
            entry.isIntersecting &&
            !this.miniRendered
          ) {
            this.miniRendered = true;

            this.renderChain = this.renderChain.then(async () => {
              await this.renderMiniEvents();
              await new Promise((res) => setTimeout(res, 300));
            });
          }

          if (
            entry.target === this.judgingSection &&
            entry.isIntersecting &&
            !this.judgingRendered
          ) {
            this.judgingRendered = true;

            this.renderChain = this.renderChain.then(async () => {
              await this.renderJudgingThenTimelineThenRegistration();
              await new Promise((res) => setTimeout(res, 300));
            });
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(this.rulesSection);
    observer.observe(this.miniEventsSection);
    observer.observe(this.judgingSection);
  }

  async renderRules() {
    const terminal = new TerminalEngine(this.rulesSection);
    terminal.setTypingSpeed(40);

    await terminal.printWithCursor("./event --load-rules", this.rulesSection);
    await terminal.printAsciiBlock(this.RULES, this.rulesSection);
  }

  async renderMiniEvents() {
    const terminal = new TerminalEngine(this.miniEventsSection);
    terminal.setTypingSpeed(40);

    await terminal.printWithCursor(
      "./event --run-mini-events",
      this.miniEventsSection,
    );

    let output;

    if (Array.isArray(this.MINI_EVENTS)) {
      output = `
starting runtime event scheduler...

${this.MINI_EVENTS.map(
  (e) => `[${e.time}] ${e.name.padEnd(30)} .... queued`,
).join("\n")}

scheduler active.
`;
    } else {
      output = this.MINI_EVENTS;
    }

    await terminal.printAsciiBlock(output, this.miniEventsSection);
  }

  async renderJudgingThenTimelineThenRegistration() {
    const judgingTerminal = new TerminalEngine(this.judgingSection);

    // Faster judging typing speed
    judgingTerminal.setTypingSpeed(8);

    await judgingTerminal.printWithCursor(
      "./event --judge",
      this.judgingSection,
    );

    const lines = this.JUDGING.split("\n");

    for (const line of lines) {
      await judgingTerminal.printWithCursor(line, this.judgingSection);
    }

    await new Promise((res) => setTimeout(res, 300));

    const timelineTerminal = new TerminalEngine(this.timelineSection);
    timelineTerminal.setTypingSpeed(18);

    await timelineTerminal.printWithCursor(
      "./event --timeline",
      this.timelineSection,
    );
    await timelineTerminal.printAsciiBlock(this.TIMELINE, this.timelineSection);

    // 3 second cinematic gap before registration
    await new Promise((res) => setTimeout(res, 1000));

    await this.renderRegistration();
  }

  async renderRegistration() {
    if (this.registrationRendered) return;
    this.registrationRendered = true;

    const terminal = new TerminalEngine(this.registrationSection);
    terminal.setTypingSpeed(18);

    await terminal.printWithCursor(
      "./event --register",
      this.registrationSection,
    );
    await terminal.printAsciiBlock(this.REGISTRATION, this.registrationSection);

    this.awaitUserInput(terminal);
  }

  awaitUserInput(terminal) {
    const inputWrapper = document.createElement("div");
    inputWrapper.style.display = "flex";
    inputWrapper.style.alignItems = "center";
    inputWrapper.style.marginTop = "8px";

    const prompt = document.createElement("span");
    prompt.textContent = "> ";
    prompt.style.marginRight = "6px";

    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.autofocus = true;
    input.style.background = "transparent";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.color = "#00ff66";
    input.style.fontFamily = "inherit";
    input.style.fontSize = "inherit";
    input.style.width = "20px";

    inputWrapper.appendChild(prompt);
    inputWrapper.appendChild(input);

    this.registrationSection.appendChild(inputWrapper);

    input.focus();

    input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        const value = input.value.toLowerCase();

        inputWrapper.remove();

        if (value === "y") {
          await terminal.printWithCursor("> y", this.registrationSection);
          await terminal.printWithCursor(
            "opening secure connection...",
            this.registrationSection,
          );
          await terminal.printWithCursor(
            "redirecting to registration portal...",
            this.registrationSection,
          );

          window.open("https://YOUR_GOOGLE_SITES_LINK", "_blank");

          await terminal.printWithCursor(
            "connection established.",
            this.registrationSection,
          );
        } else {
          await terminal.printWithCursor("> n", this.registrationSection);
          await terminal.printWithCursor(
            "registration aborted.",
            this.registrationSection,
          );
        }
      }
    });
  }
}