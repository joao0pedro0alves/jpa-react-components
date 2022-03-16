import React from "react";
import { DateIOFormats } from "@date-io/core/IUtils";

import MuiLocalizationProvider, {
  MuiPickersAdapter,
} from "@mui/lab/LocalizationProvider";
import MuiDatePicker, { DatePickerProps } from "@mui/lab/DatePicker";
import MuiAdapaterDateFns from "@mui/lab/AdapterDateFns";

import { TextField, TextFieldCustomProps } from "../TextField";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

type DateValue = string | Date | null;

export type DatePickerCustomProps = {
  value?: string | Date;
  name: string;
  onChange?: (event: unknown, date: DateValue, inputName: string) => void;
  inputComponentProps?: TextFieldCustomProps;
  datePickerComponentProps?: DatePickerProps<DateValue>;
  children?: React.ReactNode;
  /** DateIO adapter class function */
  dateAdapter?: new (...args: any) => MuiPickersAdapter<unknown>;
  /** Formats that are used for any child pickers */
  dateFormats?: Partial<DateIOFormats>;
  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance?: any;
  /** Locale for the date library you are using */
  locale?: string | object;
};

/**
 * Docs:
 *
 * - [DatePicker](https://mui.com/components/date-picker/)
 *
 * @param {DatePickerProps} props
 */
export const DatePicker: React.FC<DatePickerCustomProps> = ({
  name,
  value,
  onChange,
  inputComponentProps,
  datePickerComponentProps,
  ...props
}) => {
  const handleChange = (date: string | Date | null) => {
    if (onChange && date) {
      onChange(null, date, name);
    }
  };

  const dateAdapter = props.dateAdapter || MuiAdapaterDateFns;

  return (
    <MuiLocalizationProvider {...props} dateAdapter={dateAdapter}>
      <MuiDatePicker
        {...datePickerComponentProps}
        value={value || null}
        onChange={handleChange}
        renderInput={(inputprops) => (
          <TextField name={name} {...inputComponentProps} {...inputprops} />
        )}
      />
    </MuiLocalizationProvider>
  );
};

export default DatePicker;
