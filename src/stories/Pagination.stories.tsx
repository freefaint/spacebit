import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SpaceBitTheme } from '@/components';
import { Pagination } from '@/components/material';

export default {
  title: 'Interface/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <SpaceBitTheme color="#f00">
    <Pagination {...args} />
  </SpaceBitTheme>
);

export const Default = Template.bind({});
Default.args = {
  count: 10,
  page: 3,
};
