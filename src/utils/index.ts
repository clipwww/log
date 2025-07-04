export const colors = [
  'rgb(255, 99, 132)',
  'rgb(54, 162, 235)',
  'rgb(75, 192, 192)',
  'rgb(255, 159, 64)',
  'rgb(153, 102, 255)',
  'rgb(255, 205, 86)',
  '#81E6D9',
  '#718096',
  '#742A2A',
  '#68D391',
  '#2C5282',
  '#6B46C1',
]

export function lightOrDark(color: string) {
  if (color === 'white') {
    return 'light'
  }
  if (color === 'black') {
    return 'dark'
  }

  // Variables for red, green, blue values
  let r: number
  let g: number
  let b: number

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    const colorArr = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/) ?? []
    r = +colorArr[1]
    g = +colorArr[2]
    b = +colorArr[3]
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    const colorNum = +(`0x${color.slice(1).replace(color.length < 5 ? /./g : '', '$&$&')}`)
    r = colorNum >> 16
    g = colorNum >> 8 & 255
    b = colorNum & 255
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(
    0.299 * (r * r)
    + 0.587 * (g * g)
    + 0.114 * (b * b),
  )

  return hsp > 127.5 ? 'light' : 'dark' // 127.5
}
