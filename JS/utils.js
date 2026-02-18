export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

export const createElement = (tag, className = "") => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
};

export const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);

export const randomId = (prefix = "id") =>
    `${prefix}_${Math.random().toString(36).slice(2, 9)}`;

export const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
};

export const once = (fn) => {
    let called = false;
    return (...args) => {
        if (!called) {
            called = true;
            return fn(...args);
        }
    };
};