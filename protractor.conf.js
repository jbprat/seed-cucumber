const
    glob         = require('glob'),
    protractor   = require.resolve('protractor'),
    node_modules = protractor.substring(0, protractor.lastIndexOf('node_modules') + 'node_modules'.length),
    seleniumJar  = glob.sync(`${node_modules}/protractor/**/selenium-server-standalone-*.jar`).pop();

exports.config = {

    baseUrl: 'https://www.angularjs.org/',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),

    specs: [ 'features/**/*.feature' ],

    cucumberOpts: {
        require:    [ 'features/**/*.ts' ],
        format:     'pretty',
        compiler:   'ts:ts-node/register'
    },

    multiCapabilities: [{
        browserName: 'chrome',

        chromeOptions: {
            args: [
                '--disable-infobars',
                // "--headless",
                // "--disable-gpu",
                // "--window-size=1024x768"
            ]
        }
    }, {
        browserName: 'firefox'
    }]
};