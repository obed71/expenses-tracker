export default class {
  static key = 'expenses';

  static create(data) {
    const expenses = this.read();
    this.save([...expenses, data]);
  }

  static read() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  static update(data, id) {
    const expenses = this.read();
    expenses.splice(id, 1, data);
    this.save(expenses);
  }

  static remove(id) {
    const expenses = this.read();
    expenses.splice(id, 1);
    this.save(expenses);
  }

  static empty() {
    localStorage.removeItem(this.key);
  }

  static get balance() {
    return this.read().reduce((total, { amt }) => total + +amt, 0);
  }

  static getById(id) {
    const expenses = this.read();
    return expenses[id] || null;
  }

  static save(expenses) {
    localStorage.setItem(this.key, JSON.stringify(expenses));
  }
}
