export { updatePixelRatio, setBackGround }

let dPR = window.devicePixelRatio
let backGroundUrl = ``

//////////////////////set background of Body////////////////////////
async function setBackGround() {
    backGroundUrl = await onloadFetchBg()
    document.body.style.backgroundImage = `url('${backGroundUrl}&dpr=${dPR}')`
}

/////////////////ONLOAD FETCH BG & place in LET/////////////////////////
async function onloadFetchBg() {
    const fetchedData = await fetch('https://api.unsplash.com/photos/random?orientation=landscape&client_id=-_WaTkHs23f_trveYoqlgf_SW6cKHl1E8acgWHKLejE&query=nature')
    const dataPromise = await fetchedData.json()

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
  if (backGroundUrl) {
    document.body.style.backgroundImage = `url('${backGroundUrl}&dpr=${dPR}')`
  }
}