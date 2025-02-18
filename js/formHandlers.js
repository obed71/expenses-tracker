import Expenses from './expenses.js';
import { formatMoney, formatDate } from './utils.js';

const formEl = document.querySelector('.form');
const formBtn = document.querySelectorAll('.form button');
const inputEls = document.querySelectorAll('.form input');

export function handleSubmit() {
  const data = collectFormData();
  const action = formEl.getAttribute('data-action');
  const index = formEl.getAttribute('data-id');

  if (validateForm(data)) {
    if (action === 'create') Expenses.create(data);
    else if (action === 'update') Expenses.update(data, index);

    resetForm();
    render();
  }
}

export function handleRemove() {
  const index = formEl.getAttribute('data-id');
  Expenses.remove(index);
  resetForm();
  render();
}

function collectFormData() {
  const data = {};
  inputEls.forEach((el) => {
    data[el.id] = el.value;
  });

  return data;
}

function validateForm(data) {
  let isFormValid = true;

  for (const key in data) {
    const value = data[key];
    const inputEl = [...inputEls].find((el) => el.id === key);

    if (!value.trim()) {
      inputEl.classList.add('error');
      isFormValid = false;
    } else {
      inputEl.classList.remove('error');
    }
  }

  return isFormValid;
}

export function render() {
  const historyEl = document.querySelector('.history');
  historyEl.innerHTML = '';

  renderBalance(historyEl);
  renderTransactions(historyEl);
}

function renderBalance(historyEl) {
  historyEl.innerHTML += `
    <button class="empty-expenses" onclick="emptyExpenses()">
      <i class="fa-solid fa-trash"></i>
    </button>
    <div class="balance">
      <span>Balance :</span>
      <span class="${Expenses.balance >= 0 ? 'positive' : 'negative'} amt">
        ${formatMoney(Expenses.balance)}
      </span>
    </div>
  `;
}

function renderTransactions(historyEl) {
  historyEl.innerHTML += Expenses.read()
    .map(
      (obj, i) =>
        `<div class="transaction" onclick="update(${i})">
          <span class="date">${formatDate(obj.date)}</span>
          <span class="desc">${obj.desc}</span>
          <span class="amt ${obj.amt >= 0 ? 'positive' : 'negative'}">
            ${formatMoney(obj.amt)}
          </span>
        </div>`
    )
    .reverse()
    .join('');
}

export function update(index) {
  formEl.setAttribute('data-action', 'update');
  formEl.setAttribute('data-id', index);
  formBtn[2].textContent = 'Update';

  inputEls.forEach((el) => {
    el.value = Expenses.read()[index][el.id];
  });
}

export function emptyExpenses() {
  Expenses.empty();
  render();
}

export function resetForm() {
  formEl.setAttribute('data-action', 'create');
  formEl.removeAttribute('data-id');
  formBtn[2].textContent = 'Create';

  inputEls.forEach((el) => {
    el.value = '';
    el.classList.remove('error');
  });
}

window.update = update;
window.emptyExpenses = emptyExpenses;
