const { Notification } = require('electron')
const { CreateErrorFile } = require('./files.js')
const Errors = []

exports.handleError = (error) => {
    if (error.code === 'EEXIST') return CreateErrorFile({ code: error.code, message: error.message, translation: 'Ya existe un archivo con ese nombre' })
    if (error.code === 'ENOENT') return CreateErrorFile({ code: error.code, message: error.message, translation: 'No se encontro el archivo que se buscaba' })
    if (error.code === 'EISDIR') return CreateErrorFile({ code: error.code, message: error.message, translation: '' })
    if (error.code === 'ENOTDIR') return CreateErrorFile({ code: error.code, message: error.message, translation: 'Directorio no valido' })
}
