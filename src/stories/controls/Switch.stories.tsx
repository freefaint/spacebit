import React from 'react';
import { Switch } from '@material-ui/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SpaceBitTheme } from '@/components';

export default {
  title: 'Controls/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => (
  <div>
    <SpaceBitTheme color="#f00">
      <Switch {...args} />
    </SpaceBitTheme>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
