// Form.stories.ts|tsx
import React, { useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as Yup from "yup";
import { phoneMask } from "jpa-ts-utils";
import { Form, FormRef } from ".";
import {
  FormTextField,
  FormCheckbox,
  FormRadioGroup,
  FormFileInput,
  FormDatePicker,
  FormSelect,
  FormCombobox,
} from "./components";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const CREATE_USER_TIMEOUT = 1000 * 3; // 3s

const initialData = {
  user: {
    name: "João Pedro",
    nickname: "",
    phone: "19996050746",
    birthDate: Date(),
  },
  gender: "M",
  email: "joao.alves1032003@gmail.com",
  password: "joaopedro",
  confirmPassword: "joaopedro",
  acceptTerms: true,
};

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Form",
  component: Form,
} as ComponentMeta<typeof Form>;

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")])
    .required(),
  acceptTerms: Yup.bool()
    .oneOf([true])
    .required("Please accept our terms of service"),

  // user
  user: Yup.object().shape({
    name: Yup.string().required(),
  }),
});

const states = [
  { label: "São Paulo", value: "sp", country_id: 1 },
  { label: "Los Angeles", value: "la", country_id: 2 },
  { label: "Paris", value: "pr", country_id: 3 },
];

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Form> = (args) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormRef<typeof initialData> | null>(null);

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      formRef.current.setValues(initialData);
    }, CREATE_USER_TIMEOUT);
  };

  const handleFillUserNickName = (e) => {
    const value = e.target.value;
    if (typeof value === "string") {
      const nickname = value
        .replace(/\s/g, "-")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      formRef.current.setFieldValue("user.nickname", nickname);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="header" marginBottom={2}>
        <Typography color="primary.main" component="h2" variant="h3">
          Sign up
        </Typography>
        <Typography gutterBottom component="p" variant="body2" color="GrayText">
          Please, fill form with your data to sign up
        </Typography>

        <Divider />
      </Box>

      <Box display="flex">
        <Form
          style={{ flex: 1, minWidth: 500 }}
          formRef={formRef}
          validationSchema={schema}
          onSubmit={handleSubmit}
          {...args}
        >
          <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
              <FormFileInput
                name="user.profile"
                label="Click to insert a profile photo"
              >
                {({ file }) => (
                  <Avatar
                    src={file.file}
                    alt={file.name}
                    sx={{ width: 56, height: 56 }}
                  />
                )}
              </FormFileInput>
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                label="Name"
                name="user.name"
                onBlur={handleFillUserNickName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField fullWidth label="Nickname" name="user.nickname" />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                name="user.phone"
                label="Phone"
                type="tel"
                placeholder="(DDD)+"
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                textMaskProps={{
                  mask: phoneMask,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                name="user.addPhone"
                label="Phone 2"
                type="tel"
                placeholder="(DDD)+"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                textMaskProps={{
                  mask: phoneMask,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormSelect
                required
                fullWidth
                label="Country"
                name="country"
                options={[
                  { value: 1, label: "Brazil" },
                  { value: 2, label: "United States" },
                  { value: 3, label: "French" },
                ]}
                onAfterChange={(countryId) => {
                  const newState = states.find(
                    ({ country_id }) => country_id === Number(countryId)
                  );

                  formRef.current.setFieldValue("state", newState.value);
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <FormSelect
                required
                fullWidth
                label="State"
                name="state"
                options={states}
              />
            </Grid>

            <Grid item xs={6}>
              <FormDatePicker
                name="user.birthDate"
                inputComponentProps={{
                  label: "Birth Date",
                  fullWidth: true,
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormCombobox
                label="Social Status"
                name="user.socialStatus"
                options={[
                  { label: "Other", value: "0", disabled: true },
                  { label: "Single", value: "1" },
                  { label: "Married", value: "2" },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormRadioGroup
                row
                name="gender"
                label="Gender"
                options={[
                  { value: "F", label: "Female" },
                  { value: "M", label: "Male" },
                  { value: "O", label: "Other", disabled: true },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField required fullWidth label="E-mail" name="email" />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                required
                fullWidth
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <FormTextField
                required
                fullWidth
                label="Confirm your password"
                name="confirmPassword"
                type="password"
              />
            </Grid>
            <Grid item xs>
              <FormCheckbox
                name="acceptTerms"
                label="Accept our terms of contract"
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                loading={loading}
                type="submit"
                variant="contained"
              >
                Create Account
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

export const SignUp = Template.bind({});

SignUp.args = {
  /*👇 The args you need here will depend on your component */
  initialData,
};
