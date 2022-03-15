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

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

interface Option {
  value: unknown;
  label:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export type RadioGroupCustomProps = {
  options: Option[];
  label?: string;
  error?: boolean;
  helperText?: string;
  RadioProps?: RadioProps;
} & RadioGroupProps;

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
