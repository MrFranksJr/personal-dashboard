import { setBackGround, updatePixelRatio, getFullDate } from "./data/utils.js"

function initLoad() {
    //Check screen/pixel ratio
    updatePixelRatio()
    //set background
    setBackGround()
    document.getElementById('current-date').textContent = getFullDate()
}

initLoad()