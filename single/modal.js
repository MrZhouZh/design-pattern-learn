const Modal = (function() {
  let modal = null
  return function() {
    if(!modal) {
      modal = document.createElement('div')
      modal.innerHTML = '我是一个全局唯一的Modal'
      modal.id = 'modal'
      modal.style.display = 'none'
      modal.style.position = 'fixed'
      modal.style.top = 0
      modal.style.right = 0
      modal.style.bottom = 0
      modal.style.left = 0
      modal.style.textAlign = 'center'
      modal.style.fontSize = '30px'
      modal.style.color = '#fff'
      modal.style.background = 'rgba(0,0,0,.3)'
      document.body.appendChild(modal)
    }
    return modal
  }
})()

const modal = new Modal()
console.log(modal)
