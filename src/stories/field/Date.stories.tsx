import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field, FieldType } from 'components/form/field';
import { SpaceBitTheme } from 'components/theme';
import { FormControl } from '@material-ui/core';

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
