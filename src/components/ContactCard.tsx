import React, { useState } from "react";
import { Contact } from "../types/contactTypes";
import { useDispatch } from "react-redux";
import { contactToBeEdited, deleteContact } from "../store/slices/contactSlice";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

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

  const [revealDetails, setRevealDetails] = useState<boolean>(false);

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
    <div className="p-5 min-w-[300px] md:w-3/4 lg:w-1/2 mx-auto">
      <div className="border bg-gray-100 border-gray-100 p-5 rounded-lg flex flex-col justify-center items-center w-full">
        {revealDetails ? (
          <>
            <div className="font-medium w-full">
              <p className="text-lg">Firstname: </p>
              <span
                className="break-words overflow-hidden w-full"
                style={{ fontStyle: "italic" }}
              >
                {contact.firstName}
              </span>
            </div>
            <div className="font-medium w-full mt-2">
              <p className="text-lg">Lastname: </p>
              <span
                className="break-words overflow-hidden w-full"
                style={{ fontStyle: "italic" }}
              >
                {contact.lastName}
              </span>
            </div>
            <div className="font-medium w-full mt-2">
              <p className="text-lg">Status: </p>
              <span
                className="break-words overflow-hidden w-full"
                style={{ fontStyle: "italic" }}
              >
                {contact.status}
              </span>
            </div>
          </>
        ) : (
          <button
            onClick={() => setRevealDetails(true)}
            className="bg-blue-300 border px-7 py-2 text-white rounded-xl font-roboto"
          >
            Reveal Details
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row justify-between mt-2 w-full">
        <button
          onClick={() => handleEditContact(contact)}
          className="bg-blue-300 border px-7 py-2 text-white rounded-xl font-roboto text-center"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteContact(contact.id)}
          className="bg-red-300 border px-7 py-2 text-white rounded-xl font-roboto text-center"
        >
          Delete
        </button>
      </div>

      <div className="flex justify-center mt-3">
        {revealDetails && (
          <button
            onClick={() => setRevealDetails(false)}
            className="bg-red-300 border px-7 py-2 text-white rounded-xl font-roboto"
          >
            <div className="flex justify-center items-center gap-x-2">
              <RxCross1 size={18} />
              <p>Hide details</p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
