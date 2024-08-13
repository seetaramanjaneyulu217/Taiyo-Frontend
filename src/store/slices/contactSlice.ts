import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Contact } from "../../types/contactTypes";

interface InitialState {
  contacts: Contact[];
  contactToBeEdited: Contact;
}

const initialState: InitialState = {
  contacts: [],
  contactToBeEdited: {
    id: "",
    firstName: "",
    lastName: "",
    status: "",
  },
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContactToTheStore: (state: InitialState, action) => {
      state.contacts.push({ id: nanoid(), ...action.payload.contact });
    },
    contactToBeEdited: (state: InitialState, action) => {
      state.contactToBeEdited = action.payload.contactToEdit;
    },
    editContactDetailsAndPassToStore: (state: InitialState, action) => {
      const indexOfTheContact: number = state.contacts.findIndex(
        (contact: Contact) => contact.id === action.payload.contact.id
      );
      const contactToEdit: Contact = state.contacts[indexOfTheContact];
      state.contacts = state.contacts.filter(
        (contact: Contact) => contact.id !== action.payload.contact.id
      );
      const newContactDetails = {
        id: contactToEdit.id,
        firstName: action.payload.contact.firstName,
        lastName: action.payload.contact.lastName,
        status: action.payload.contact.status,
      };
      state.contacts.splice(indexOfTheContact, 0, newContactDetails);
    },
    deleteContact: (state: InitialState, action) => {
      state.contacts = state.contacts.filter(
        (contact: Contact) => contact.id !== action.payload.contactId
      );
    },
  },
});

export default contactSlice.reducer;
export const {
  addContactToTheStore,
  contactToBeEdited,
  editContactDetailsAndPassToStore,
  deleteContact,
} = contactSlice.actions;
