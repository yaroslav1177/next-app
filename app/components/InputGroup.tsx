import React from "react";

interface InputGroupProps {
  name: string;
  changeID: (id: number) => void;
  total: number;
}

export const InputGroup: React.FC<InputGroupProps> = ({ name, changeID, total }) => {
  return (
    <div className="mb-3">
      <select
        onChange={(e) => changeID(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300 text-3xl cursor-pointer"
        id={name}
      >
        <option value="1">Choose...</option>
        {Array.from({ length: total }, (_, x) => (
          <option key={x + 1} value={x + 1}>
            {name} - {x + 1}
          </option>
        ))}
      </select>
    </div>
  );
};
