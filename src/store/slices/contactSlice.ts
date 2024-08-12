import { createSlice } from "@reduxjs/toolkit";
import { Contact } from "../../types/contactTypes";

interface InitialState {
    contacts: Contact[]
}

const initialState: InitialState = {
    contacts: []
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContactToTheStore: (state: InitialState, action) => {
            state.contacts.push(action.payload)
        },
        editContactDetails: (state: InitialState, action) => {
            const indexOfTheContact: number = state.contacts.findIndex((contact: Contact) => contact.id === action.payload.contactId)
            const contactToEdit: Contact = state.contacts[indexOfTheContact]
            const newContactDetails = {
                id: contactToEdit.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                status: action.payload.status
            }
            state.contacts.splice(indexOfTheContact, 0, newContactDetails);
        },
        deleteContact: (state: InitialState, action) => {
            state.contacts = state.contacts.filter((contact: Contact) => contact.id !== action.payload.contactId)
        }
    }
})

export default contactSlice.reducer
export const { addContactToTheStore, editContactDetails, deleteContact } = contactSlice.actions