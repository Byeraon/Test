import React from "react";

export const HouseInput = () => {
  return (
    <div>
      <input
        onChange={(event) => checkTrueStreet(event.target.value)}
        list="streets"
      ></input>
      <datalist id="streets">
        {streets.map((el) => (
          <option value={el.name}></option>
        ))}
      </datalist>
    </div>
  );
};
