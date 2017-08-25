const nova = require('nova-colors')
const Handlebars = require('handlebars')
const hexRgb = require('hex-rgb')
const fs = require('fs')

const hexToRGB = (hex) => {
  const [red, green, blue] = hexRgb(hex)
  return `rgb(${red}, ${green}, ${blue})`
}

const ansiGroups = Object.keys(nova.ansiGroups).reduce((result, key) => {
  const mapOfRGB = Object.keys(nova.ansiGroups[key]).reduce((memo, colorName) => {
    memo[colorName] = hexToRGB(nova.ansiGroups[key][colorName])
    return memo
  }, {})
  result[key] = mapOfRGB
  return result
}, {})

// const uiGroups = Object.keys(nova.uiGroups).reduce((result, colorName) => {
//     result[colorName] = hexToRGB(nova.uiGroups[colorName])
//     return result
//   }, {});
const uiGroups = nova.uiGroups
// console.log(ansiGroups);

const template = Handlebars.compile(fs.readFileSync('src/nova.handlebars').toString())

process.stdout.write(template({ansiGroups, uiGroups}))
