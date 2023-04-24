module.exports = {
    ci: {
        collect: {
            url: [ 
                    'https://appdev4.expensya.com/Portal/#/Login',
                    'https://appdev4.expensya.com/Portal/#/Dashboard',
                    
                    ],
            numberOfRuns: 1,
            headful: true, 
            puppeteerScript: 'authScript.js',  // Ensure there's an authenticated user before running Lighthouse
          },
          assert: {
            preset: 'lighthouse:recommended',
        },
        upload: {
            target: 'lhci',
           serverBaseUrl: 'http://127.0.0.1:9001/',
            token: '08de3002-8528-40f8-8617-1f9d80bb177c', // the build token provider by the wizard.
            // admin token 8geliBcQm0HHW7xxCP4dtt7GumGvkZkyylwoYNmu
        },
    }
};
