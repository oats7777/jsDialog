import { templateToDom } from './util.js';

class JsDialogBody {
  #content;
  #templateToDom;

  constructor({ content = '' }) {
    this.#content = content;
    this.#templateToDom = templateToDom;
  }

  #createContent(content) {
    return this.#templateToDom(
      `<div class="jsdialog__popup__content">${content}</div>`
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

export default JsDialogBody;
