import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Contact } from "../types/contactTypes";
import { useSelector } from "react-redux";
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  const contacts: Contact[] = useSelector(
    (state: any) => state.contact.contacts
  );
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formType, setFormType] = useState<"new" | "edit">("new");

  return (
    <div className="px-32">
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            setOpenForm((prev) => !prev)
            if(formType === 'edit') {
              setFormType("new")
            }
          }}
          className={`${
            !openForm ? "bg-green-300" : "bg-red-300"
          } border px-7 py-2 text-white rounded-xl font-roboto`}
        >
          {!openForm ? (
            <div className="flex items-center gap-x-1">
              <AiOutlinePlus size={18} />
              Create Contact
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              <RxCross1 size={18} />
              {formType === "new"
                ? "Cancel creating contact"
                : "Cancel editing contact"}
            </div>
          )}
        </button>
      </div>

      {openForm && (
        <ContactForm
          formType={formType}
          setOpenForm={setOpenForm}
          setFormType={setFormType}
        />
      )}

      <div>
        {contacts.length === 0 ? (
          <div className="flex justify-center text-2xl font-semibold font-roboto lg:max-w-96 lg:mx-auto mt-12">
            No Contact Found. Please add contact from Create Contact Button
          </div>
        ) : (
          <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1">
            {contacts.map((contact: Contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                setOpenForm={setOpenForm}
                setFormType={setFormType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
