import React from 'react';
import { FormControl } from '@material-ui/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field, FieldType } from '../../components/form/field';
import { SpaceBitTheme } from '../../components/theme';

export default {
  title: 'Field/Select',
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => (
  <SpaceBitTheme color="#019393">
    <FormControl fullWidth>
      <Field {...args} />
    </FormControl>
  </SpaceBitTheme>
);

const items = ((length: number) => new Array(length).fill(true).map((i, j) => ({ name: `Example ${j + 1}` })))(50);

export const Default = Template.bind({});
Default.args = {
  type: FieldType.Select,
  source: () => Promise.resolve(items),
  label: 'Стандартный автокомплит',
};
