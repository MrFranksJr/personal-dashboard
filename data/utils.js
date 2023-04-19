export { getFullDate, getTime }

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