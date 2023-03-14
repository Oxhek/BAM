const path = require('path')
const fs = require('fs')
const fileName = 'BACC.json'
const halfpath = path.join(process.env.APPDATA, 'BACCFiles')
const filepath = path.join(halfpath, fileName)

const { handleError } = require('./appError.js')

function getFilex () {
    const file = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    if (!fs.existsSync(filepath)) handleError({ code: 'ENOENT', message: 'No se encontro el archivo que se buscaba' })
    else return file
}

function checkFile (appVersion) {
    const file = getFilex()
    if (!file.version < appVersion) return true
    else return false
}
function deleteFile () {
    if (!fs.existsSync(filepath)) return handleError({ code: 'ENOENT', message: 'No se encontro el archivo que se buscaba' })
    fs.unlinkSync(filepath)
}

function UpdateFile (reason, data) {
    const filex = getFilex()
    filex.data.push(data)
    filex.reason.push(reason)
    fs.writeFileSync(filepath, JSON.stringify(filex, null, 4, null))
}

function CreateVersionedfile () {
    const file = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    const filex = file
    const appVersion = filex.appConfig.version
    if (!fs.existsSync(halfpath)) fs.mkdirSync(halfpath)
    if (fs.existsSync(filepath)) return handleError({ code: 'EEXIST', message: 'Archivo existente, no puede ser actualizado desde esta funcion' })

    const Data = {
        version: 1,
        userImage: '../public/defaultImage.png',
        name: '',
        argument: [],
        data: []
    }
    fs.writeFileSync(filepath, JSON.stringify(Data, null, 4, null))
}

exports.getFile = function () {
    const file = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    if (!fs.existsSync(filepath)) handleError({ code: 'ENOENT', message: 'No se encontro el archivo que se buscaba' })
    else return file
}

exports.Createfile = function () {
    if (!checkFile()) { CreateVersionedfile() }
    if (!fs.existsSync(halfpath)) fs.mkdirSync(halfpath)
    if (fs.existsSync(filepath)) return handleError({ code: 'EEXIST', message: 'Archivo existente, no puede ser actualizado desde esta funcion' })

    const Data = {
        userImage: '../public/defaultImage.png',
        name: '',
        argument: [],
        data: []
    }
    fs.writeFileSync(filepath, JSON.stringify(Data, null, 4, null))
}

exports.UpdateFinances = function (reason, data) {
    const file = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    file.data[file.data.length] = data
    fs.writeFileSync(filepath, JSON.stringify(file, null, 4, null))
}

exports.UpdateFile = function (reason, data) {
    if (reason === '' || typeof (reason) !== typeof ('')) reason = 'unknown'
    let file = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    file = JSON.parse(fs.readFileSync(filepath, 'utf8'))
    file.data.push(data)
    file.reason.push(reason)
    fs.writeFileSync(filepath, JSON.stringify(file, null, 4, null))
}

exports.CreateErrorFile = function (error) {
    if (error.translation === '') error.translation = 'Unknown'
    const errorData = {
        Code: error.code,
        Message: error.message,
        Translation: error.translation
    }
    const FileName = error.code + '.json'
    const errorPath = path.join(process.env.APPDATA, 'BACC', 'ErrorLogs')
    const fullPath = path.join(errorPath, FileName)
    if (!fs.existsSync(errorPath)) fs.mkdirSync(fullPath)
    fs.createWriteStream(fullPath, JSON.stringify(errorData, null, 4, null))
}
