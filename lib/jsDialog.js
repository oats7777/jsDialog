class JsDialog {
  #title;
  #body;
  #className;
  #close;
  #submit;
  constructor({
    title = '',
    body = '',
    className = 'popup',
    close = () => null,
    submit = () => null,
  }) {
    this.#title = title;
    this.#body = body;
    this.#className = className;
    this.#close = close;
    this.#submit = submit;
  }

  #templateToDom(template) {
    const wrapDom = document.createElement(`div`);
    wrapDom.innerHTML = template;
    return wrapDom.firstChild;
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

  #createContent(content) {
    return this.#templateToDom(
      `<div class="jsdialog__popup__content">${content}</div>`
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
      popupDom.appendChild(this.#createTitle(this.#title));
    }
    if (this.#body) {
      popupDom.appendChild(this.#createContent(this.#body));
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
