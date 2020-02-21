const waitOneFrame = () => new Promise(resolve => requestAnimationFrame(resolve))
const waitUntilTransition = () => new Promise(resolve => setTimeout(resolve, 400))

const input = toggle => toggle.querySelector('input')
const content = toggle => toggle.querySelector('.content')
const isOpen = toggle => !input(toggle).checked
const setOpen = (toggle, status) => input(toggle).checked = !status
const label = (toggle, className) => toggle.querySelector(`label.${className}`)
const hide = el => el.style.display = 'none'
const show = el => el.style.display = 'block'
const heightOf = el => {
  const height = el.offsetHeight;
  const style = getComputedStyle(el)
  return height + parseInt(style.marginTop) + parseInt(style.marginBottom)
}

const open = async toggle => {
  const div = content(toggle)
  await waitOneFrame()
  div.style.overflow = 'hidden'
  const height = heightOf(div.querySelector('div'))
  div.style.height = '0'
  await waitOneFrame()
  div.style.height = `${height}px`
  await waitUntilTransition()
  if (isOpen(toggle)) {  
    div.style.height = 'auto'
    div.style.overflow = 'visible'
  }
}

const close = async toggle => {
  const div = content(toggle)
  const height = heightOf(div.querySelector('div'))
  div.style.height = `${height}px`
  div.style.overflow = 'hidden'
  await waitOneFrame()
  await waitOneFrame()
  div.style.height = '0'
}

const setStatus = (toggle, status) => {
  if (status === 'opened') {
    hide(label(toggle, 'close'))
    show(label(toggle, 'open'))
    setOpen(toggle, true)
  }

  if (status === 'closed') {
    show(label(toggle, 'close'))
    hide(label(toggle, 'open'))
    setOpen(toggle, false)
  }
}

const toggles = document.querySelectorAll('.toggle')

toggles.forEach(toggle => {
  if (!isOpen(toggle)) {
    const div = content(toggle)
    div.style.overflow = 'hidden'
    div.style.height = '0'    
  }

  setStatus(toggle, isOpen(toggle) ? 'opened' : 'closed')
  hide(input(toggle))

  input(toggle).addEventListener('change', () => {
    if (isOpen(toggle)) {
      open(toggle)
      setStatus(toggle, 'opened')
    } else {
      close(toggle)
      setStatus(toggle, 'closed')
    }
  })
})
