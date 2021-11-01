import React from 'react';
import { Button } from '@material-ui/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SpaceBitTheme } from '../../components/theme';

export default {
  title: 'Controls/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <div>
    <SpaceBitTheme color="#f00">
      <Button {...args} />
    </SpaceBitTheme>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  variant: "contained",
  color: "primary",
  children: 'Кнопка',
};
