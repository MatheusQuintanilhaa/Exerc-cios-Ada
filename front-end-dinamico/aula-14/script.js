const getUser = (callback) => {
  // setTimeout(() => {
  return callback("Débora");
  // }, 3000);
};

const res1 = getUser((value) => {
  console.log({ value });
  return value;
});

const res2 = getUser((value) => {
  console.log({ value });
});

console.log({ res1, res2 });
