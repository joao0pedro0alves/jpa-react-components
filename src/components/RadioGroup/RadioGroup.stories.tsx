// RadioGroup.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RadioGroup } from ".";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "RadioGroup",
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

export const Default = Template.bind({});

Default.args = {
  /*👇 The args you need here will depend on your component */
  label: "Gender",
  options: [
    { value: "f", label: "Female" },
    { value: "m", label: "Male" },
  ],
};
