export { getFullDate, getTime, hideShowInfoModal, hideShowOptionsModal }

////////GET FULL Date & time /////
function getFullDate(){
  const d = new Date()
  return d.toLocaleDateString("en-GB", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
}

function getTime() {
  const d = new Date()
  let fullTime = d.toLocaleString("en-GB", {timeStyle: "short"})

  document.getElementById('current-time').textContent = fullTime
}

function hideShowInfoModal() {
  document.getElementById('bigdiv').classList.toggle('blurred')
  document.getElementsByTagName('body')[0].classList.toggle('body-blurred')
  document.getElementById('info-modal').classList.toggle('show-modal')
}

function hideShowOptionsModal(event) {
  if (event === 'open') {
    const activeCoins = JSON.parse(localStorage.getItem('crypto-assets'))
    jQuery(function($) {
      $("#crypto-list").val(activeCoins).trigger("chosen:updated");
    })
  }

  document.getElementById('bigdiv').classList.toggle('blurred')
  document.getElementsByTagName('body')[0].classList.toggle('body-blurred')
  document.getElementById('options-modal').classList.toggle('show-modal')
}