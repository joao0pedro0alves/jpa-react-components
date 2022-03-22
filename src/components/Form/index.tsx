import React, { createContext, useContext, useState } from "react";
import { lensPath, lensProp, set, view, split } from "ramda";
import * as Yup from "yup";

// --------------- 𝕄𝕖𝕥𝕒𝕕𝕒𝕥𝕒 ---------------

const DEFAULT_SEPARATION_CHAR = ".";

export interface FormContextType<T = object> {
  values: T;
  errors: object;
  isReadOnlyForm: boolean;
  setValues: React.Dispatch<React.SetStateAction<{}>>;
  setErrors: React.Dispatch<React.SetStateAction<{}>>;
  setData: (newData: any) => void;
  setFieldValue: (
    fieldName: string,
    newValue: any,
    separationChar?: string
  ) => void;
  setFieldError: (fieldName: never, value: never) => void;
  getFieldValue: (fieldName: string, separationChar?: string) => void;
  /**
   *
   * @param {string} separationChar - Character used to separate the string and assemble the required scope
   * @param {function} onAfterChange - Optional function called after form state change, can be used to change other form values
   * @returns void
   */
  onChangeValue: (
    separationChar?: string,
    onAfterChange?: (value: any, name: string, values: T) => void
  ) => (event: React.ChangeEvent<HTMLInputElement>, inputValue: any) => void;
}

export interface FormProviderProps {
  form: FormContextType;
}

export interface FormRef<Values = object> extends FormContextType<Values> {
  _form: React.ReactNode;
}

export type FormProps = {
  formRef?: React.MutableRefObject<any>;
  /**
   * Optional validation scheme, created from the `yup` library
   *
   * Docs:
   *
   * - [Yup](https://github.com/jquense/yup)
   */
  validationSchema?: Yup.AnyObjectSchema;
  initialData?: object;
  onSubmit: (values: any, e: React.FormEvent<HTMLFormElement>) => void;
} & React.FormHTMLAttributes<HTMLFormElement>;

// --------------- 𝕌𝕥𝕚𝕝𝕤 ---------------

const FormContext = createContext<FormContextType | null>(null);
FormContext.displayName = "FormContext";

const useFormContext = () => useContext(FormContext);

const useForm = ({ initialValues = {}, isReadOnlyForm = false } = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const setData = (newData: any) =>
    setValues((previous) => ({ ...previous, ...newData }));

  const setFieldValue = (
    fieldName: string,
    newValue: any,
    separationChar = DEFAULT_SEPARATION_CHAR
  ) => {
    const fieldLens = lensPath(split(separationChar, fieldName));
    setValues(set(fieldLens, newValue));
  };

  const setFieldError = (fieldName: never, value: never) => {
    const fieldLens = lensProp(fieldName);
    setErrors(set(fieldLens, value));
  };

  const getFieldValue = (
    fieldName: string,
    separationChar = DEFAULT_SEPARATION_CHAR
  ) => view(lensPath(split(separationChar, fieldName)), values);

  const onChangeValue =
    (
      separationChar = DEFAULT_SEPARATION_CHAR,
      onAfterChange?: (value: any, name: string, values: object) => void
    ) =>
    (
      event: React.ChangeEvent<HTMLInputElement> | null,
      inputValue: any,
      inputName?: string
    ) => {
      if (isReadOnlyForm) return;
      const isValid = (v?: string) => v === undefined && event !== null;
      let name = isValid(inputName) ? event?.target.name : inputName;
      let value = isValid(inputValue) ? event?.target.value : inputValue;

      if (name) {
        setFieldValue(name, value, separationChar);
        if (onAfterChange) onAfterChange(value, name, values);
      }
    };

  return {
    values,
    errors,
    isReadOnlyForm,
    setValues,
    setErrors,
    setData,
    setFieldValue,
    setFieldError,
    getFieldValue,
    onChangeValue,
  };
};

// --------------- 𝕄𝕒𝕚𝕟 ---------------

const FormProvider: React.FC<FormProviderProps> = ({ children, form }) => {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

const Form: React.FC<FormProps> = ({
  initialData,
  formRef,
  validationSchema,
  children,
  onSubmit,
  ...props
}) => {
  const form = useForm({
    initialValues: initialData,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate before submitting, if the validation schema is received by the form
    if (validationSchema) {
      form.setErrors({});

      const handleYupValidationError = (error: Yup.ValidationError | any) => {
        if (error instanceof Yup.ValidationError) {
          const formErrors = {};

          error.inner.forEach(
            (e) => ((formErrors as any)[e.path as string] = e.message)
          );

          form.setErrors(formErrors);
        }
      };

      validationSchema
        .validate(form.values, { abortEarly: false })
        .then((values) => onSubmit(values, e))
        .catch(handleYupValidationError);
    } else onSubmit(form.values, e);
  };

  const getRef = (_form: React.ReactNode) =>
    formRef ? (formRef.current = { ...form, _form }) : null;

  return (
    <FormProvider form={form}>
      <form ref={getRef} onSubmit={(event) => handleSubmit(event)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export { useFormContext, useForm, FormContext, Form };
