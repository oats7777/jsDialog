function templateToDom(template) {
  const wrapDom = document.createElement('div');
  wrapDom.innerHTML = template;
  return wrapDom.firstChild;
}

export { templateToDom };
