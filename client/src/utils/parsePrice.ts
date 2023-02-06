export function parsePrice (num: number) {
  let price = num.toString();
  let finalNum = [];
  for (let i = price.length; i >= 0; i--) {
    if (finalNum.length === 3) finalNum.unshift(".");
    else if (
      finalNum.length > 3 &&
      finalNum.join("").split(".")[0].length === 3
    )
      finalNum.unshift(".");
    finalNum.unshift(price.slice(-1));
    price = price.substring(0, price.length - 1);
  }
  if (finalNum.join("")[0] === ".") return finalNum.join("").slice(1);
  return finalNum.join("");
};

