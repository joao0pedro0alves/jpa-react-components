import React from "react";
import TextField, { TextFieldCustomProps } from "../TextField";
import { Option } from "../../types";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type SelectCustomProps = {
  options: Option[];
  emptyOption?: string | object;
} & TextFieldCustomProps;

export const Select: React.FC<SelectCustomProps> = ({
  options,
  emptyOption,
  ...props
}) => {
  return (
    <TextField {...props} select SelectProps={{ native: true }}>
      {emptyOption && (
        <option disabled key="empty-option" value="">
          {emptyOption}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};

export default Select;
