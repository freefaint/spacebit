import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Field, FieldType } from 'components/form/field';
import { SpaceBitTheme } from 'components/theme';

export default {
  title: 'Example/ProcessCard',
  component: Field,
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => (
  <SpaceBitTheme color='#019393'>
    <Field {...args} />
  </SpaceBitTheme>
);

function factory<T>(fn: () => T, count?: number) {
  return new Array(Math.ceil(count ?? Math.random() * 2)).fill(true).map(fn);
}

export const Default = Template.bind({});
Default.args = {
  type: FieldType.DateTime,
};
