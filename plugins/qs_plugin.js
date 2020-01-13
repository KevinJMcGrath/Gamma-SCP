export default ({app, store, query}) => {
    if (app.router) {        
        app.router.beforeEach((to, from, next) => {
            // Do not use app.router.push here. That will cause a loop. 
            // Use the next() function to pass the path to the router, including 
            // the desired query string
            // ** 11/16/2018 This process is working as expected **
            //console.log('To: ' + to.path)
            //console.log('From: ' + from.path)

            if (!to.query.phk && store.state.global.phk) {
                //console.log('Attempting to add PHK to URL (before)')
                next({path: to.name, query: Object.assign({}, query, {phk: store.state.global.phk})})
            }
            else if (!to.query.ck && store.state.global.community_sponsor_key) {
                next({path: to.name, query: Object.assign({}, query, {ck: store.state.global.community_sponsor_key})})
            }
            else {
                //console.log('qs_plugin:22 PHK qs exists. Moving on...')
                next()
            }
            
            
        })       

        
        app.router.afterEach((to, from) => {
            /*console.log('Running afterEach (qs_plugin.js)')
            if (process.browser) {
                console.log('from:')
                console.log(from)
                console.log('to:')
                console.log(to)
            }

            console.log('PHK - Query (after): ' + to.query.phk)
            console.log('PHK - State: (after)' + store.state.global.phk)
            
            
            if (!query.phk && store.state.global.phk) {
                console.log('Adding phk to query')
                
                // Need to use Object.assign here to ensure we are appending the query string 
                // and not overwriting the existing query parameters
                app.router.push({ query: Object.assign({}, query, {phk: store.state.global.phk})})
            }
            else {
                console.log('Missing PHK query and not found in local store')
            }*/
            
        })
        
        
    }

}