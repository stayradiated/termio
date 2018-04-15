import Colr from 'colr'

const theme = {
  color: [
    '#282a2e',
    '#a54242',
    '#8c9440',
    '#de935f',
    '#5f819d',
    '#85678f',
    '#5e8d87',
    '#707880',
    '#373b41',
    '#cc6666',
    '#b5bd68',
    '#f0c674',
    '#81a2be',
    '#b294bb',
    '#8abeb7',
    '#c5c8c6'
  ],
  foreground: '#c5c8c6',
  background: '#1d1f21'
}

const styles = {
  ':root': 'margin: 0; padding: 0;',
  'pre': 'font: 14px monospace; white-space: pre-wrap;',
  '.bold': 'font-weight: bold;',
  '.underline': 'text-decoration: underline;',
  '.italic': 'font-style: italic;',
  '.background-bg': `background-color: ${theme.background};`,
  '.background-fg': `background-color: ${theme.foreground};`,
  '.foreground-bg': `color: ${theme.background};`,
  '.foreground-fg': `color: ${theme.foreground};`,
}

for (let i = 0; i < 16; i++) {
  const className = `.foreground-${i}`
  styles[className] = `color: ${theme.color[i]};`
}

for (let i = 0; i < 16; i++) {
  const className = `.background-${i}`
  styles[className] = `background-color: ${theme.color[i]};`
}

for (let i = 0; i < 8; i++) {
  const className = `.bold .foreground-${i}, .foreground-${i} .bold`
  styles[className] = `color: ${theme.color[8 + i]};`
}

for (let red = 0; red < 6; red++) {
  for (let green = 0; green < 6; green++) {
    for (let blue = 0; blue < 6; blue++) {
      const index = 16 + (red * 36) + (green * 6) + blue
      const r = red > 0 ? red * 40 + 55 : 0
      const g = green > 0 ? green * 40 + 55 : 0
      const b = blue > 0 ? blue * 40 + 55 : 0
      styles[`.foreground-${index}`] = `color: ${Colr.fromRgb(r, g, b).toHex()};`
      styles[`.background-${index}`] = `background-color: ${Colr.fromRgb(r, g, b).toHex()};`
    }
  }
}

// grayscale
for (let gray = 0; gray < 24; gray++) {
  const index = gray + 232
  const l = gray * 10 + 8 // luminosity
  styles[`.foreground-${index}`] = `color: ${Colr.fromGrayscale(l).toHex()};`
  styles[`.background-${index}`] = `background-color: ${Colr.fromGrayscale(l).toHex()};`
}

// generate css string
let css = ''
for (const selector in styles) {
  css += `${selector} { ${styles[selector]} }\n`
}

export default css
