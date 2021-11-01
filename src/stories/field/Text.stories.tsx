import React from 'react';
import { FormControl } from '@material-ui/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field, FieldType } from '../../components/form/field';
import { SpaceBitTheme } from '../../components/theme';

export default {
  title: 'Field/Text',
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
  type: FieldType.Number,
  label: 'Стандартное текстовое поле',
  value: 'Example',
};

export const Small = Template.bind({});
Small.args = {
  type: FieldType.Number,
  label: 'Маленькое текстовое поле',
  size: 'small',
  value: 'Example',
};

export const Readonly = Template.bind({});
Readonly.args = {
  type: FieldType.Number,
  label: 'Текстовое поле только для чтения',
  readOnly: true,
  value: 'Example',
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: FieldType.Number,
  label: 'Выключенное текстовое поле',
  disabled: true,
  value: 'Example',
};
