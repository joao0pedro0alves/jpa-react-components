// FileInput.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FileInput } from ".";

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "FileInput",
  component: FileInput,
} as ComponentMeta<typeof FileInput>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const Default = Template.bind({});

Default.args = {
  /*👇 The args you need here will depend on your component */
  label: "Click to load your file",
  onChange: (e, readedFile) => console.log(readedFile),
};
