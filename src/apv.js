const apv = require('appversion')
const { setVersion, setStatus } = require('appversion/automation')
const superagent = require('superagent')
const { appError } = require('./utils/appError.js')

function update (major, minor, patch) {
    const appVersion = apv.getAppVersionSync().version
    if (appVersion.major < major) {
        if (appVersion.minor < minor) {
            if (appVersion.patch < patch) {
                apv.setVersion(major, minor, patch)
            }
        }
    }
}

exports.checkForUpdate = () => {
    const url = ''

    const request = superagent.get(url, (data, error) => {
        if (error) return error
    })
    request.on('response', (response) => {
        const data = JSON.stringify(response)
        console.log(data)
        if (data.version.major > apv.getAppVersion.version.major) {
            if (data.version.minor > apv.getAppVersion.version.minor) {
                if (data.version.patch > apv.getAppVersion.version.patch) {
                    update(data.version.major, data.version.minor, data.version.patch)
                }
            }
        }
    })
}

exports.update = function (major, minor, patch) {
    const appVersion = apv.getAppVersionSync().version
    if (appVersion.major < major) {
        if (appVersion.minor < minor) {
            if (appVersion.patch < patch) {
                setVersion(major, minor, patch)
                setStatus('Beta v1')
                apv.composePatternSync('M.m.p-Ss n-d')
            }
        }
    }
}
