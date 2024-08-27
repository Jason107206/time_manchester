export const addDigit = (value: number) =>
  value.toString().length == 1 ? `0${value}` : `${value}`