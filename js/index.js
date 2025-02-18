import {
  handleSubmit,
  handleRemove,
  resetForm,
  render,
} from './formHandlers.js';

const formBtn = document.querySelectorAll('.form button');

render();
resetForm();

formBtn[2].addEventListener('click', handleSubmit);
formBtn[1].addEventListener('click', handleRemove);
formBtn[0].addEventListener('click', resetForm);
