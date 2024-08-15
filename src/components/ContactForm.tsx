import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContactToTheStore,
  editContactDetailsAndPassToStore,
} from "../store/slices/contactSlice";
import toast from "react-hot-toast";
import { Contact, ContactDetails } from "../types/contactTypes";

interface ContactFormProps {
  formType: "new" | "edit";
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setFormType: React.Dispatch<React.SetStateAction<"new" | "edit">>;
}

const ContactForm = ({
  formType,
  setOpenForm,
  setFormType,
}: ContactFormProps) => {
  const dispatch = useDispatch();
  const contactToBeEdited: Contact = useSelector(
    (state: any) => state.contact.contactToBeEdited
  );
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    firstName: "",
    lastName: "",
    status: "",
  });
  const [editContactDetails, setEditContactDetails] = useState<ContactDetails>({
    firstName: contactToBeEdited.firstName,
    lastName: contactToBeEdited.lastName,
    status: contactToBeEdited.status,
  });

  const handleFormSubmission = () => {
    if (
      contactDetails.firstName === "" ||
      contactDetails.lastName === "" ||
      contactDetails.status === ""
    ) {
      toast.error("Fill all details");
      return;
    }
    dispatch(addContactToTheStore({ contact: contactDetails }));
    setOpenForm(false);
    toast.success("Contact created successfully");
  };

  const handleEditFormSubmission = () => {
    if (
      editContactDetails.firstName === "" ||
      editContactDetails.lastName === "" ||
      editContactDetails.status === ""
    ) {
      toast.error("Fill all details");
      return;
    }
    dispatch(
      editContactDetailsAndPassToStore({
        contact: { id: contactToBeEdited.id, ...editContactDetails },
      })
    );
    setOpenForm(false);
    setFormType("new");
    toast.success("Contact edited successfully");
  };

  return (
    // This is a contact form for both creating new contact and also edit the existing contact.
    <div className="flex justify-center mt-12">
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-x-5">
          <label className="text-lg font-semibold">First Name: </label>
          <input
            type="text"
            placeholder="Enter firstname"
            className="border bg-gray-100 border-gray-100 px-5 py-2 rounded-xl outline-none"
            defaultValue={
              formType === "edit" ? contactToBeEdited.firstName : ""
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              formType === "new"
                ? setContactDetails({
                    ...contactDetails,
                    firstName: e.target.value,
                  })
                : setEditContactDetails({
                    ...editContactDetails,
                    firstName: e.target.value,
                  })
            }
          />
        </div>

        <div className="flex items-center gap-x-5">
          <label className="text-lg font-semibold">Last Name: </label>
          <input
            type="text"
            placeholder="Enter lastname"
            className="border bg-gray-100 border-gray-100 px-5 py-2 rounded-xl outline-none"
            defaultValue={formType === "edit" ? contactToBeEdited.lastName : ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              formType === "new"
                ? setContactDetails({
                    ...contactDetails,
                    lastName: e.target.value,
                  })
                : setEditContactDetails({
                    ...editContactDetails,
                    lastName: e.target.value,
                  })
            }
          />
        </div>

        <div className="flex items-center gap-x-16">
          <label className="text-lg font-semibold">Status: </label>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <input
                type="radio"
                id="active"
                name="status"
                value={"active"}
                className="h-4 w-4"
                defaultChecked={
                  formType === "edit"
                    ? contactToBeEdited.status === "active"
                    : false
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  formType === "new"
                    ? setContactDetails({
                        ...contactDetails,
                        status: e.target.value,
                      })
                    : setEditContactDetails({
                        ...editContactDetails,
                        status: e.target.value,
                      })
                }
              />
              <label htmlFor="active" className="text-lg font-medium">
                Active
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="radio"
                id="inactive"
                name="status"
                value={"inactive"}
                className="h-4 w-4"
                defaultChecked={
                  formType === "edit"
                    ? contactToBeEdited.status === "inactive"
                    : false
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  formType === "new"
                    ? setContactDetails({
                        ...contactDetails,
                        status: e.target.value,
                      })
                    : setEditContactDetails({
                        ...editContactDetails,
                        status: e.target.value,
                      })
                }
              />
              <label htmlFor="inactive" className="text-lg font-medium">
                Inactive
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={
            formType === "new" ? handleFormSubmission : handleEditFormSubmission
          }
          className="border bg-green-300 px-7 py-2 text-white rounded-xl font-roboto"
        >
          {formType === "new" ? "Save Contact" : "Edit contact"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
