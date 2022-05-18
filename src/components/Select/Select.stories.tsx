// Select.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from ".";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Select",
  component: Select,
} as ComponentMeta<typeof Select>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});

const countries = [
  { value: "BRZ", label: "Brazil" },
  { value: "USA", label: "United States" },
];

Default.args = {
  /*👇 The args you need here will depend on your component */
  label: "Country",
  emptyOption: "Select your origin country",
  options: countries,
  fullWidth: true,
};
