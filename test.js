// const phone = (value) => {
//   return value
//     .replace(/\D/g, "")
//     .replace(/(\d{2})(\d)/, "($1) $2 ")
//     .replace(/(\d{4})(\d)/, "$1-$2")
//     .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
//     .replace(/(-\d{4})\d+?$/, "$1");
// };

const phone = (value) => {
  const regex = /^(\d{2})(\d{1})(\d{4})(\d{4})$/;
  return value.replace(regex, "($1) $2 $3-$4");
};

const numberFormated = phone("75992512104");
console.log(numberFormated);
