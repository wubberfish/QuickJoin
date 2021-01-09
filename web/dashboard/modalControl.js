import { clearValues, checkLinkValid, checkDuplicateName } from '../util.js'
import { renderNewLink, addNewLink, renderOperationStatus } from './linksView.js'
import { cloneDeep } from 'lodash/lang'
import { state } from './state.js'
const { classLink } = state

const modalOpenButton = document.querySelector('.add_link_button')
const modalCloseButton = document.querySelector('.cancel-modal')
const modal = document.querySelector('.add_link_modal')

modalOpenButton.addEventListener('click', () => modal.style.display = 'block')
modalCloseButton.addEventListener('click', () => {
    modal.style.display = 'none'
    clearValues(classLink)
})

let newLinkInputs = document.querySelectorAll('.new-link-input')
newLinkInputs.forEach(input => {
    input.addEventListener('input', () => classLink[input.id] = input.value.trim()) // trim values to avoid errors with innerText
})

const addLinkButton = document.querySelector('.add-link-button')
addLinkButton.addEventListener('click', async () => {
    // TODO: trim white space on link names
    if (!checkLinkValid(classLink)) {
        renderOperationStatus('Link url and link name cannot be empty')
        return closeAddLinkModal()
    } else if (checkDuplicateName(state.linkArray, classLink.link_name)) {
        renderOperationStatus('Link name must be unique')
        return closeAddLinkModal()
    }

    if (!classLink.link_time) {
            classLink.link_time = 'N/A'
    }

    const tempLink = cloneDeep(classLink)
    await addNewLink(tempLink)
    renderNewLink(tempLink)
    closeAddLinkModal()
})

function closeAddLinkModal() {
    modal.style.display = 'none'
    clearValues(classLink)
    newLinkInputs.forEach(field => field.value = '')
}

const removeLinkModal = document.querySelector('.remove-link-modal')
const removeLinkModalContent = document.querySelector('.remove-link-modal-content')
export function removeLinkConfirmed(linkName) {
    flipDisplay(removeLinkModal)

    removeLinkModal.firstElementChild.firstElementChild.innerText = 'Remove ' + linkName + '?'
    return new Promise((resolve) => {
        removeLinkModalContent.children[1].onclick = () => {
            flipDisplay(removeLinkModal)
            resolve(true)
        }
        removeLinkModalContent.children[2].onclick = () => {
            flipDisplay(removeLinkModal)
            resolve(false)
        }
    })
}

function flipDisplay(e) {
    e.style.display ? e.style.display = '' : e.style.display = 'block'
}

const editLinkModal = document.querySelector('.edit-link-modal')
const editLinkModalContent = document.querySelector('.edit-link-modal-content')
const editLinkInputs = document.querySelectorAll('.edit-link-input')
editLinkInputs.forEach(input => {
    input.addEventListener('input', () => {state.editLink[input.id] = input.value; console.log(state.editLink)})
})

export function openLinkEditor({ link_url, link_time, link_name }) {
    editLinkInputs.forEach(input => {
        const id = input.id
        if (id == 'edit-name') {
            input.value = link_name
            state.editLink[id] = link_name
        } else if (id == 'edit-url') {
            input.value = link_url
            state.editLink[id] = link_url
        } else {
            input.value = link_time
            state.editLink[id] = link_time
        }
    })
    editLinkModal.style.display = 'block'
}

document.querySelector('#close-link-editor')
    .addEventListener('click', () => {
        editLinkModal.style.display = 'none'
        clearValues(state.editLink)
    })

document.querySelector('#save-edited-link')
    .addEventListener('click', () => {
        
    })
