import React from "react";
import {
  FormHelperText,
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps,
} from "@mui/material";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type CheckboxCustomProps = {
  label: string;
  error?: boolean;
  helperText?: string;
} & CheckboxProps;

export const Checkbox: React.FC<CheckboxCustomProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <>
      <FormControlLabel label={label} control={<MuiCheckbox {...props} />} />
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </>
  );
};

export default Checkbox;
