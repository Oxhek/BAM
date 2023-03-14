const apv = require('appversion')

exports.update = function (major, minor, patch) {
    const appVersion = apv.getAppVersionSync().version
    if (appVersion.major < major) {
        if (appVersion.minor < minor) {
            if (appVersion.patch < patch) {
                
            }
        }
    }
}
