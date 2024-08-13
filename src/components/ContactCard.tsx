import React from "react";
import { Contact } from "../types/contactTypes";
import { useDispatch } from "react-redux";
import { contactToBeEdited, deleteContact } from "../store/slices/contactSlice";
import toast from "react-hot-toast";

interface ContactCardProps {
  contact: Contact;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormType: React.Dispatch<React.SetStateAction<"new" | "edit">>;
}

const ContactCard = ({
  contact,
  setOpenForm,
  setFormType,
}: ContactCardProps) => {
  const dispatch = useDispatch();

  const handleEditContact = (contact: Contact) => {
    setFormType("edit");
    setOpenForm(true);
    dispatch(contactToBeEdited({ contactToEdit: contact }));
  };

  const handleDeleteContact = (contactId: string) => {
    dispatch(deleteContact({ contactId }));
    toast.success("Contact deleted successfully");
  };
  return (
    <div className="lg:max-w-72 p-5">
      <div className="border bg-gray-100 border-gray-100 p-5 rounded-lg flex flex-col justify-center items-center">
        <div className="font-medium">
          Firstname:{" "}
          <span className="text-lg" style={{ fontStyle: "italic" }}>
            {contact.firstName}
          </span>
        </div>
        <div className="font-medium">
          Lastname:{" "}
          <span className="text-lg" style={{ fontStyle: "italic" }}>
            {contact.lastName}
          </span>
        </div>
        <div className="font-medium">
          Status:{" "}
          <span className="text-lg" style={{ fontStyle: "italic" }}>
            {contact.status}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button
          onClick={() => handleEditContact(contact)}
          className="bg-blue-300 border px-7 py-2 text-white rounded-xl font-roboto"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteContact(contact.id)}
          className="bg-red-300 border px-7 py-2 text-white rounded-xl font-roboto"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
