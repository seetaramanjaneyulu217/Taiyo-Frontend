import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const Contact = () => {
  return (
    <div>
      <div className="flex justify-center mt-10">
        <button className="bg-green-300 border px-7 py-2 text-white rounded-xl flex items-center gap-x-1">
          <AiOutlinePlus size={18} />
          Create Contact
        </button>
      </div>
    </div>
  );
};

export default Contact;
