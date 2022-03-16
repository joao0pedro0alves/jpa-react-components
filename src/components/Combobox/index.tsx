import React from "react";
import MuiAutocomplete from "@mui/lab/Autocomplete";
import { AutocompleteRenderInputParams } from "@mui/material";

import TextField, { TextFieldCustomProps } from "../TextField";
import { FormInputProps, Option } from "../../types";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type ComboboxCustomProps = FormInputProps & {
  value: any;
  inputComponentProps?: TextFieldCustomProps;
  options: Option[];
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
    inputName: string
  ) => void;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
};

export function Combobox({
  name,
  error,
  helperText,
  inputComponentProps,
  onChange,
  value,
  ...props
}: ComboboxCustomProps) {
  return (
    <MuiAutocomplete
      {...props}
      value={value || null}
      disablePortal
      isOptionEqualToValue={(option, selectedOption) =>
        option.value === selectedOption.value
      }
      onChange={(e, option) =>
        typeof onChange === "function"
          ? onChange(e, option || null, name)
          : undefined
      }
      renderInput={(params) => (
        <TextField
          label={props.label}
          error={error}
          helperText={helperText}
          {...params}
          {...inputComponentProps}
        />
      )}
    />
  );
}

export default Combobox;
