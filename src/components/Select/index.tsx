import React from "react";
import { MenuItem } from "@mui/material";
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
    <TextField
      {...props}
      onChange={(e) => (props.onChange ? props.onChange(e) : undefined)}
      select
    >
      {emptyOption && (
        <MenuItem disabled key="empty-option" value="">
          {emptyOption}
        </MenuItem>
      )}
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
