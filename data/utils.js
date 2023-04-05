export { updatePixelRatio, setBackGround, getFullDate }

const baseURL = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature&topic=wallpapers'
/* https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature */
/* https://api.unsplash.com/photos/random?orientation=landscape&client_id=-_WaTkHs23f_trveYoqlgf_SW6cKHl1E8acgWHKLejE&query=nature */
let dPR = window.devicePixelRatio
let backGroundUrl = ``
let backgroundAuthorString = ''


//////////////////////set background of Body////////////////////////
async function setBackGround() {
    backGroundUrl = await onloadFetchBg()
    document.body.style.backgroundImage = `url('${backGroundUrl}&dpr=${dPR}')`
    document.getElementById('author').innerHTML = backgroundAuthorString
}


/////////////////ONLOAD FETCH BG & place in LET/////////////////////////
async function onloadFetchBg() {
    const fetchedData = await fetch(baseURL)
    const dataPromise = await fetchedData.json()
    backgroundAuthorString = `Photo by <a href='${dataPromise.user.links.html}' alt='${dataPromise.user.name}'s Unsplash profile page' target='_blank'>${dataPromise.user.name}</a> 
            on <a href='https://unsplash.com/?utm_source=personal-dashboard&utm_medium=referral' alt='link to Unsplash homepage' target='_blank'>Unsplash</a>`

    return dataPromise.urls.regular
}


/////////////////Update device pixel ratio///////////////////////////////////
let remove = null

const updatePixelRatio = () => {
  if (remove != null) {
    remove()
  }
  let mqString = `(resolution: ${window.devicePixelRatio}dppx)`
  let media = matchMedia(mqString)
  media.addEventListener("change", updatePixelRatio)
  remove = function () {
    media.removeEventListener("change", updatePixelRatio)
  }
  dPR = window.devicePixelRatio
  console.log('New DPR! ' + dPR)
  if (backGroundUrl) {
    document.body.style.backgroundImage = `url('${backGroundUrl}&dpr=${dPR}')`
  }
}


////////GET FULL Date /////
function getFullDate(){
  const d = new Date()
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  }
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const monthIndex = d.getMonth()
  const year = d.getFullYear()
  const date = d.getDate()
  const dayIndex = d.getDay()
  const dayName = days[dayIndex]
  const monthName = months[monthIndex]

  return `${dayName}, ${date}th of ${monthName} ${year}`
}