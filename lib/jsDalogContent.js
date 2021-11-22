import { templateToDom } from './util.js';

class JsDialogContent {
  #content;
  #templateToDom;
  #className;
  constructor({ content = '', className = '' }) {
    this.#content = content;
    this.#className = className;
    this.#templateToDom = templateToDom;
  }

  #createContent(content) {
    return this.#templateToDom(
      `<div class="${this.#className}">${content}</div>`
    );
  }

  appendTo(target) {
    if (this.#content instanceof HTMLElement) {
      target.appendChild(this.#content);
    } else {
      target.appendChild(this.#createContent(this.#content));
    }
  }
}

export default JsDialogContent;
