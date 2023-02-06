// Exportamos la funcion para convertir el numero que nos trae la api en un string con puntos
export function parsePrice (num: number) {
  // Convertimos el numero en string
  let price = num.toString();
  // Inicializamos el array que vamos a retornar al final de la funcion
  let finalNum = [];
  // Loopeamos todo string de atras para adelante
  for (let i = price.length; i >= 0; i--) {
    // Consultamos antes de que entre el nuevo numero si el array es de largo 3 para meter un punto
    if (finalNum.length === 3) finalNum.unshift(".");
    // Si mas largo que 3 juntamos el array para que sea un string, lo separamos por puntos y preguntamos que tan largo es el primer pedazo para poner un punto o no.
    else if (finalNum.length > 3 && finalNum.join("").split(".")[0].length === 3) finalNum.unshift(".");
    // Sino simplemente sumamos el ultimo numero del string al comienzo del array
    finalNum.unshift(price.slice(-1));
    // Por ultimo quitamos el elemento que acabamos de sumar al array
    price = price.substring(0, price.length - 1);
  }
  // Al finalizar el loop nos fijamos si el primer elemento del string es un numero para entonces sacarlo y retornar el string correcto.
  if (finalNum.join("")[0] === ".") return finalNum.join("").slice(1);
  // Si no devolvemos simplemente el string.
  return finalNum.join("");
};
