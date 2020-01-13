export default async function ({app, store, query, redirect, isDev}) {
    let force_redirect = false
    
    // Query string paramter for community sponsorship will be "ck="
    if (query.ck) {
        let resp = await store.dispatch('verifyCommunityKey', query.ck)
        
        if (!resp) {
            console.log('CK invalid')
            force_redirect = true
        }
    }
    else {
        console.log('CK missing')
        force_redirect = true
    }

    if (force_redirect) {
        if (!isDev) {
            redirect('https://www.symphony.com')
        }
        else {
            console.log('Dev bypass of ck redirect')
        }
        
    }
}