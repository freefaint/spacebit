import React from 'react';
import { FormControl } from '@material-ui/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field, FieldType } from '../../components/form/field';
import { SpaceBitTheme } from '../../components/theme';

export default {
  title: 'Field/Number',
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => (
  <SpaceBitTheme color="#019393">
    <FormControl fullWidth>
      <Field {...args} />
    </FormControl>
  </SpaceBitTheme>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Стандартное числовое поле',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Маленькое числовое поле',
  size: 'small',
};
