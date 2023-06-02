import React from "react";

import { download } from "../assets";
import { downloadDocument } from "../utils";

const Card = ({ _id, name, prompt, generatedDocument }) => (
  <div className="shadow-card hover:shadow-cardhover bg-[#e7e7e7] m-3 p-5 rounded-md">
    <p className="text-[#262626] text-sm prompt">{prompt}</p>
    <div className="mt-5 flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-[#262626] text-xs font-bold">
          {name[0]}
        </div>
        <p className="text-[#262626] text-sm">{name}</p>
      </div>
      <button
        type="button"
        onClick={() => downloadDocument(_id, generatedDocument)}
        className="outline-none bg-transparent border-none]"
      >
        <img
          src={download}
          alt="download"
          className="w-6 h-6 object-contain invert"
        />
      </button>
    </div>
  </div>
);

export default Card;
