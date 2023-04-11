export function kToF(kelvin){
  let fahrenheit = 9/5 * (kelvin-273) + 32

  //return fahrenheit to only 2 decimal places
  return fahrenheit.toFixed(2)
}