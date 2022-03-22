import React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  RadioGroupProps,
  FormHelperText,
  RadioProps,
} from "@mui/material";
import { FormInputProps, Option } from "../../types";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type RadioGroupCustomProps = RadioGroupProps &
  FormInputProps & {
    options: Option[];
    RadioProps?: RadioProps;
  };

export const RadioGroup: React.FC<RadioGroupCustomProps> = ({
  label,
  options,
  RadioProps,
  error,
  helperText,
  ...props
}) => {
  return (
    <FormControl>
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <MuiRadioGroup {...props}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            control={<Radio {...RadioProps} />}
          />
        ))}
      </MuiRadioGroup>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioGroup;
