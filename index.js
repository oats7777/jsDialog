import jsDialog from './lib/jsDialog.js';

const btnDom1 = document.querySelector('.hello1');
const btnDom2 = document.querySelector('.hello2');

// const jsDialog = new JsDialog({
//   title: 'hello',
//   body: '세상',
//   close: () => {
//     console.log('hello');
//   },
//   submit: () => {
//     console.log('open');
//   },
// });

btnDom1.addEventListener('click', () => {
  jsDialog.open({
    title: 'hello',
    body: '세상1',
    close: () => {
      console.log('hello');
    },
    submit: () => {
      console.log('open');
    },
  });
});

btnDom2.addEventListener('click', () => {
  jsDialog.open({
    title: 'hello',
    body: '세상2',
    close: () => {
      console.log('hello');
    },
    submit: () => {
      console.log('open');
    },
  });
});
