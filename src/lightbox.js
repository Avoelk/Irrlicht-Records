const waitOneFrame = () => new Promise(resolve => requestAnimationFrame(resolve))
const waitUntilTransition = () => new Promise(resolve => setTimeout(resolve, 800))

const close = async div => {
  div.style.opacity = 0
  document.body.classList.remove('noscroll')
  await waitUntilTransition()
  div.remove()
}

const open = async image => {
  const container = document.createElement('div')
  container.classList.add('lightbox-backdrop')
  container.addEventListener('click', () => close(container))
  const fullImage = document.createElement('img')
  fullImage.src = image.src
  fullImage.classList.add('lightbox-image')
  container.appendChild(fullImage)
  document.body.appendChild(container)
  document.body.classList.add('noscroll')
  await waitOneFrame()
  await waitOneFrame()
  container.style.opacity = '1'
}

const images = document.querySelectorAll('.lightbox')
images.forEach(image => image.addEventListener('click', () => open(image)))