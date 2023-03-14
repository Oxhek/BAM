const { ipcRenderer } = require('electron')
const { getFile } = require('../utils/files.js')
const { data, argument } = getFile()
const $ = selector => document.querySelector(selector)
// const $$ = selector => document.querySelectorAll(selector)

const addBTN = $('#add')
const removeBTN = $('#substract')
const _data = $('#data')

function display () {
    const cE = tag => document.createElement(tag)

    const dataMoneyContainer = cE('font')
    const dataArgsContainer = cE('h3')

    for (let i = 0; i >= data.length; i++) {
        dataMoneyContainer.id = 'MoneyFont'
        dataArgsContainer.id = 'argsFont'
        if (data[i].includes('+')) dataMoneyContainer.color = 'paleGreen'
        else dataMoneyContainer.color = 'red'
        dataMoneyContainer.textContent = data[i]
        dataArgsContainer.textContent = argument[i]
        _data.appendChild(dataMoneyContainer)
        _data.appendChild(dataArgsContainer)
    }
}
