// Combobox.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Combobox } from ".";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Combobox",
  component: Combobox,
} as ComponentMeta<typeof Combobox>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Combobox> = (args) => (
  <Combobox {...args} />
);

export const Default = Template.bind({});

const options = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
];

Default.args = {
  /*👇 The args you need here will depend on your component */
  label: "Movies",
  options,
  sx: {
    maxWidth: 300,
  },
};
