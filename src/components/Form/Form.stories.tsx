// Form.stories.ts|tsx
import React, { useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form, FormRef } from ".";
import {
  FormTextField,
  FormCheckbox,
  FormRadioGroup,
  FormFileInput,
  FormDatePicker,
  FormSelect,
} from "./components";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { phoneMask } from "jpa-ts-utils";
import * as Yup from "yup";
import parseISO from "date-fns/parseISO";

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

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Form> = (args) => {
  const formRef = useRef<FormRef | null>(null);

  const handleSubmit = (values) => {
    console.log(values);
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
        <Typography component="p" variant="body2" color="GrayText">
          Please, fill form with your data to sign up
        </Typography>
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
              />
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
            <Grid item xs={12}>
              <FormTextField
                required
                fullWidth
                label="Phone"
                name="user.phone"
                InputLabelProps={{
                  shrink: true,
                }}
                textMaskProps={{
                  mask: phoneMask,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormSelect
                fullWidth
                label="Country"
                name="country"
                options={[
                  { value: "br", label: "Brazil" },
                  { value: "usa", label: "United States" },
                  { value: "french", label: "French" },
                ]}
              />
            </Grid>
            <Grid item xs={6}>
              <FormDatePicker
                name="user.birthDate"
                inputComponentProps={{
                  fullWidth: true,
                  required: true,
                }}
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
                  { value: "O", label: "Other" },
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
              <Button fullWidth type="submit" variant="contained">
                Create Account
              </Button>
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
  initialData: {
    user: {
      name: "João Pedro",
      nickname: "",
      phone: "19996050746",
      birthDate: parseISO(new Date().toISOString()),
    },
    gender: "M",
    email: "joao.alves1032003@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  },
};
