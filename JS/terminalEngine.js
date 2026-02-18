import { createElement, sleep } from "./utils.js";

export class TerminalEngine {
  constructor(container) {
    this.container = container;
    this.typingSpeed = 18;
  }

  setTypingSpeed(speed) {
    this.typingSpeed = speed;
  }

  createCommandLine(commandText) {
    const line = createElement("div", "command-line");

    const prompt = createElement("span", "prompt");
    prompt.textContent = ">";

    const command = createElement("span", "command");
    command.textContent = commandText;

    line.appendChild(prompt);
    line.appendChild(command);

    return line;
  }

  createOutputBlock() {
    return createElement("div", "output");
  }

  createCursor() {
    const cursor = createElement("span", "cursor blink");
    return cursor;
  }

  async typeText(element, text) {
    element.textContent = "";
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await sleep(this.typingSpeed);
    }
  }

  async printCommand(commandText, section) {
    const line = this.createCommandLine(commandText);
    section.appendChild(line);
    return line;
  }

  async printOutput(text, section, typed = false) {
    if (!text || text.trim() === "") return null;

    const output = this.createOutputBlock();
    section.appendChild(output);

    if (typed) {
      await this.typeText(output, text);
    } else {
      output.textContent = text;
    }

    return output;
  }

  async printAsciiBlock(text, section) {
    const block = createElement("pre", "ascii-block");
    block.textContent = text;
    section.appendChild(block);
    return block;
  }

  async printWithCursor(text, section) {
    const line = this.createCommandLine("");
    const commandSpan = line.querySelector(".command");
    const cursor = this.createCursor();

    section.appendChild(line);
    commandSpan.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {
      commandSpan.insertBefore(document.createTextNode(text[i]), cursor);
      await sleep(this.typingSpeed);
    }

    cursor.remove();
    return line;
  }

  clearSection(section) {
    section.innerHTML = "";
  }
}
