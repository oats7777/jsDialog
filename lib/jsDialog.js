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
    const dimTemplate = `<div class="jsdialog--dim"></div>`;
    return this.#templateToDom(dimTemplate);
  }

  #removeDim() {
    const dimDom = document.querySelector('.jsdialog--dim');
    const body = document.querySelector('body');
    body.removeChild(dimDom);
  }

  #createPopup({ className }) {
    const popupTemplate = `<div class="jsdialog--popup ${className}"></div>`;
    return this.#templateToDom(popupTemplate);
  }

  #createContent(content) {
    const titleTemplate = `<div>${content}</div>`;
    return this.#templateToDom(titleTemplate);
  }

  #createButton(buttonName, eventName, btnCallBack) {
    const buttonTemplate = `<button>${buttonName}</button>`;
    const buttonDom = this.#templateToDom(buttonTemplate);
    buttonDom.addEventListener(eventName, () => {
      btnCallBack();
      this.#removeDim();
    });
    return buttonDom;
  }

  open() {
    const bodyDom = document.querySelector('body');
    const dimDom = this.#createDim();
    const popupDom = this.#createPopup({ className: this.#className });

    popupDom.appendChild(this.#createContent(this.#title));
    popupDom.appendChild(this.#createContent(this.#body));
    popupDom.appendChild(this.#createButton('닫기', 'click', this.#close));
    popupDom.appendChild(this.#createButton('열기', 'click', this.#submit));

    dimDom.appendChild(popupDom);

    bodyDom.appendChild(dimDom);
  }
}

function open(param) {
  const jsDialog = new JsDialog(param);
  jsDialog.open();
}
export default { open };
