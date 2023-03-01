module.exports = {
    ci: {
        collect: {

            url: "http://127.0.0.1:3000/",
            startServerCommand: "npm run start",
            numberOfRuns: 1, // Set low to speed up the test runs. Default is 3.
            //headful: true, // Show the browser which is helpful when checking the config
            settings: {
                disableStorageReset: true, // Don't clear localStorage / IndexedDB / etc before loading the page
                preset: 'desktop'
            }
        },
        upload: {
            target: 'lhci',
           serverBaseUrl: 'http://localhost:9001',
            token: '79a74b81-5b1c-4fd9-9ab2-1cfa367a09b5', // the build token provider by the wizard.
            // admin token 1QCzd0ZPv0n8UnFyflZ1LqqDRxp6DIBolF7l4TaY
        },
    }
};
