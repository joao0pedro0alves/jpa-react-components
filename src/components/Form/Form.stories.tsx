// Form.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Form } from ".";
import { FormTextField } from "./components";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Form",
  component: Form,
} as ComponentMeta<typeof Form>;

const initialData = {
  email: "",
  password: "",
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Form> = (args) => {
  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <Container maxWidth="sm">
      <Box component="header" marginBottom={2}>
        <Typography component="h2" variant="h3">
          Sign up
        </Typography>
        <Typography component="p" variant="body2" color="GrayText">
          Please, fill form with your data to sign up
        </Typography>
      </Box>
      <Form initialData={initialData} onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12}>
            <FormTextField required fullWidth label="Name" name="user.name" />
          </Grid>

          <Grid item xs={12}>
            <FormTextField fullWidth label="Nickname" name="user.nickname" />
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
            <Button fullWidth type="submit" variant="contained">
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

export const SignUp = Template.bind({});

SignUp.args = {
  /*👇 The args you need here will depend on your component */
};
