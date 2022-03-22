import React from "react";
import MuiAutocomplete from "@mui/material/Autocomplete";
import { AutocompleteRenderInputParams } from "@mui/material";

import TextField, { TextFieldCustomProps } from "../TextField";
import { FormInputProps, Option } from "../../types";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

export type ComboboxCustomProps = FormInputProps & {
  /** Combobox options */
  options: Option[];
  value?: Option | null;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: any,
    inputName: string
  ) => void;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  inputComponentProps?: TextFieldCustomProps;
};

export const Combobox: React.FC<ComboboxCustomProps> = ({
  name,
  error,
  helperText,
  inputComponentProps,
  onChange,
  value,
  ...props
}) => {
  return (
    <MuiAutocomplete
      {...props}
      value={value || null}
      disablePortal
      getOptionDisabled={(option) => option.disabled || false}
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
};

export default Combobox;
