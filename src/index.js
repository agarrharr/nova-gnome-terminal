const nova = require('nova-colors')
const Handlebars = require('handlebars')
const fs = require('fs')

const rgbaNova = Object.keys(nova.ansiGroups).reduce((result, key) => {
  const mapOfRGB = Object.keys(nova.ansiGroups[key]).reduce((memo, colorName) => {
    memo[colorName] = nova.ansiGroups[key][colorName]
    return memo
  }, {})
  result[key] = mapOfRGB
  return result
}, {})

const template = Handlebars.compile(fs.readFileSync('src/nova.handlebars').toString())

process.stdout.write(template(rgbaNova))
