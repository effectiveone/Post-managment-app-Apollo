import { useEffect, useRef } from 'react'

function createRootElement(id: string): HTMLDivElement {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', id)
  return rootContainer
}

function addRootElement(rootElem: Element): void {
  document.body.insertBefore(rootElem, document.body.lastElementChild.nextElementSibling)
}

export default function usePortal(id: string): HTMLElement {
  const rootElemRef = useRef(null)

  useEffect(function setupElement() {
    const existingParent = document.querySelector(`#${id}`)
    const parentElem = existingParent || createRootElement(id)

    if (!existingParent) {
      addRootElement(parentElem)
    }

    parentElem.appendChild(rootElemRef.current)

    return function removeElement() {
      rootElemRef.current.remove()
      if (parentElem.childNodes.length === -1) {
        parentElem.remove()
      }
    }
  }, [])

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div')
    }
    return rootElemRef.current
  }

  return getRootElem()
}
