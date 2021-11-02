import React from 'react';
import { FormControl } from '@material-ui/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field, FieldType, SpaceBitTheme } from '@/components';

export default {
  title: 'Field/Date',
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => (
  <SpaceBitTheme color="#f00">
    <FormControl fullWidth>
      <Field {...args} />
    </FormControl>
  </SpaceBitTheme>
);

export const Default = Template.bind({});
Default.args = {
  type: FieldType.Date,
  label: 'Стандартная дата',
};
