import { templateToDom } from './util.js';
import JsDialogContent from './jsDalogContent.js';

class JsDialog {
  #title;
  #body;
  #className;
  #close;
  #submit;
  #templateToDom;
  constructor({
    title = '',
    body = '',
    className = 'popup',
    close = () => null,
    submit = () => null,
  }) {
    this.#title = new JsDialogContent({
      content: title,
      className: 'jsdialog__popup__title',
    });
    this.#body = new JsDialogContent({
      content: body,
      className: 'jsdialog__popup__content',
    });
    this.#className = className;
    this.#close = close;
    this.#submit = submit;
    this.#templateToDom = templateToDom;
  }

  #createDim() {
    return this.#templateToDom(`<div class="jsdialog__dim"></div>`);
  }

  #removeDim() {
    const dimDom = document.querySelector('.jsdialog__dim');
    const body = document.querySelector('body');
    body.removeChild(dimDom);
  }

  #createPopup({ className }) {
    return this.#templateToDom(
      `<div class="jsdialog__popup ${className}"></div>`
    );
  }

  #createTitle(content) {
    return this.#templateToDom(
      `<div class="jsdialog__popup__title">${content}</div>`
    );
  }

  #createButton(buttonName, eventName, btnCallBack) {
    const buttonDom = this.#templateToDom(
      `<button class="jsdialog__popup__button jsdialog__popup__button--${buttonName}">${buttonName}</button>`
    );
    buttonDom.addEventListener(eventName, () => {
      btnCallBack();
      this.#removeDim();
    });
    return buttonDom;
  }

  #createButtonWrap() {
    return this.#templateToDom(
      `<div class="jsdialog__popup__button-wrap"></div>`
    );
  }

  open() {
    const bodyDom = document.querySelector('body');
    const dimDom = this.#createDim();
    const popupDom = this.#createPopup({ className: this.#className });
    const buttonWrapDom = this.#createButtonWrap();

    if (this.#title) {
      this.#title.appendTo(popupDom);
    }

    if (this.#body) {
      this.#body.appendTo(popupDom);
    }

    buttonWrapDom.appendChild(
      this.#createButton('close', 'click', this.#close)
    );
    buttonWrapDom.appendChild(
      this.#createButton('submit', 'click', this.#submit)
    );
    popupDom.appendChild(buttonWrapDom);
    dimDom.appendChild(popupDom);
    bodyDom.appendChild(dimDom);
  }
}

function open(param) {
  const jsDialog = new JsDialog(param);
  jsDialog.open();
}

export default { open };
