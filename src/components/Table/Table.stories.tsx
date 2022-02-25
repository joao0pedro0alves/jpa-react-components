// Table.stories.ts|tsx
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Table } from ".";
import { Chip, Button } from "@mui/material";

interface Dev {
  name: string;
  occupation: string;
  frameworks: string[];
}

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});

Default.args = {
  /*👇 The args you need here will depend on your component */
  columns: [
    { field: "name", title: "Name" },
    { field: "occupation", title: "Occupation" },
    {
      field: "frameworks",
      title: "Frameworks",
      renderCell: ({ rowData }) => {
        const dev = rowData as Dev;
        return (
          <>
            {Array.isArray(dev.frameworks) &&
              dev.frameworks.map((framework, idx) => (
                <Chip
                  key={idx}
                  sx={{
                    "& + &": { marginLeft: 2 },
                  }}
                  label={framework}
                />
              ))}
          </>
        );
      },
    },
  ],
  data: [
    { name: "João Pedro", occupation: "Web programmer", frameworks: ["React"] },
    { name: "Samuel", occupation: "Web programmer", frameworks: ["React"] },
    {
      name: "Leandro",
      occupation: "programmer",
      frameworks: ["React", "Rails"],
    },
    { name: "Wemerson", occupation: "programmer", frameworks: ["Delphi"] },
  ],
  actions: [
    {
      icon: <Button size="small">EDIT</Button>,
      tooltip: "Edit",
      onClick: (rd) => {
        console.log(`Start edit from ${rd.name}`);
      },
    },
  ],
};
