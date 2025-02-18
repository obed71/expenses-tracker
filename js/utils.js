export function formatMoney(money) {
  let result = String(+money).split('.');
  const decimalNumber = result.splice(1, 1)[0];
  result = result[0].split('').reverse();

  const len = result.length;

  for (let x = 3; x < len; x += 3) {
    if (result[x] === '-') continue;
    result.splice(x, 1, `${result[x]}, `);
  }

  return decimalNumber
    ? `${result.reverse().join('')}.${decimalNumber}`
    : result.reverse().join('');
}

export function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
}
