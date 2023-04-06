import { setBackGround, updatePixelRatio, getFullDate, getTime } from "./data/utils.js"

function initLoad() {
    //Check screen/pixel ratio
    updatePixelRatio()
    //set background
    setBackGround()
    document.getElementById('current-date').textContent = getFullDate()
    getTime()
}

initLoad()
setInterval(()=> getTime(), 5000)