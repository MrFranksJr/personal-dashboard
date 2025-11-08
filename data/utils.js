export { getFullDate, getTime, hideShowInfoModal, hideShowOptionsModal }

const timeElement = document.getElementById('current-time')
const bigDiv = document.getElementById('bigdiv')
const body = document.body
const infoModal = document.getElementById('info-modal')
const optionsModal = document.getElementById('options-modal')

////////GET FULL Date & time /////
function getFullDate(){
  const d = new Date()
  return d.toLocaleDateString("en-GB", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
}

function getTime() {
  const d = new Date()
  const fullTime = d.toLocaleString("en-GB", {timeStyle: "short"})
  timeElement.textContent = fullTime
}

function hideShowInfoModal() {
  bigDiv.classList.toggle('blurred')
  body.classList.toggle('body-blurred')
  infoModal.classList.toggle('show-modal')
}

function hideShowOptionsModal(event) {
  if (event === 'open') {
    const activeCoins = JSON.parse(localStorage.getItem('crypto-assets'))
    jQuery(function($) {
      $("#crypto-list").val(activeCoins).trigger("chosen:updated");
    })
  }

  bigDiv.classList.toggle('blurred')
  body.classList.toggle('body-blurred')
  optionsModal.classList.toggle('show-modal')
}