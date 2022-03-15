// TextField.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextField } from ".";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

// export const Default = Template.bind({});

export const Outlined = Template.bind({});

export const Filled = Template.bind({});

export const Standard = Template.bind({});

const getArgs = ({ ...args }) => ({
  /*👇 The args you need here will depend on your component */
  label: "Label",
  placeholder: "Placeholder",
  required: false,
  disabled: false,
  focused: false,
  hiddenLabel: false,
  margin: "normal",
  size: "medium",
  ...args,
});

Outlined.args = getArgs({
  variant: "outlined",
});

Filled.args = getArgs({
  variant: "filled",
});

Standard.args = getArgs({
  variant: "standard",
});
