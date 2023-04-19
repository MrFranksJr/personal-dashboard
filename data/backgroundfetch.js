import { unSplashAPI } from "./data.js"
export { setBackGround }

let backGroundUrl = ``
let backgroundAuthorString = ''

//////////////////////set background of Body////////////////////////
async function setBackGround() {
    backGroundUrl = await onloadFetchBg()
    document.body.style.backgroundImage = `url('${backGroundUrl}')`
    document.getElementById('author').innerHTML = backgroundAuthorString
}


/////////////////ONLOAD FETCH BG & place in LET/////////////////////////
async function onloadFetchBg() {
    const baseURL = `https://api.unsplash.com/photos/random?orientation=landscape&client_id=${unSplashAPI}&query=nature`
    /* https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature */
    /* https://api.unsplash.com/photos/random?orientation=landscape&client_id=-_WaTkHs23f_trveYoqlgf_SW6cKHl1E8acgWHKLejE&query=nature */
    /* https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscapes,nature&topic=wallpapers */

    const fetchedData = await fetch(baseURL)
    const dataPromise = await fetchedData.json()
    backgroundAuthorString = `Photo by <a href='${dataPromise.user.links.html}' alt='${dataPromise.user.name}'s Unsplash profile page' target='_blank'>${dataPromise.user.name}</a> 
            on <a href='https://unsplash.com/?utm_source=personal-dashboard&utm_medium=referral' alt='link to Unsplash homepage' target='_blank'>Unsplash</a>`

    return dataPromise.urls.full
}