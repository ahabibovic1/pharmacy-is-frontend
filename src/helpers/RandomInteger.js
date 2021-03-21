export function getRandomInt() {
  let min = 0;
  let max = 1000;
  min = Math.ceil(0);
  max = Math.floor(1000);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
