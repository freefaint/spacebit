import React from 'react';
import { PlayCircleFilled } from '@material-ui/icons';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SpaceBitTheme, Layout } from '../../components';

import { PageRoute, UserRole, PageType } from '../../types';

export default {
  title: 'Layout/Page',
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => (
  <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, margin: "-16px" }}>
    <SpaceBitTheme color="#f00">
      <Layout {...args}>
        {123}
      </Layout>
    </SpaceBitTheme>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  page: PageRoute.Users,
  onNavigate: () => void 0,
  user: { id: 1, role: 'Admin', name: 'dev' },
  Logo: PlayCircleFilled,
  menu: [
    {
      title: "Пользователи",
      icon: <PlayCircleFilled />,
      route: PageRoute.Users,
      type: PageType.Registry,
      roles: [UserRole.Admin]
    },
    {
      title: "Сканирование",
      icon: <PlayCircleFilled />,
      route: PageRoute.Scans,
      type: PageType.Registry,
      roles: [UserRole.Admin]
    },
    {
      title: "Организации",
      icon: <PlayCircleFilled />,
      route: PageRoute.Organizations,
      type: PageType.Registry,
      roles: [UserRole.Admin]
    },
    {
      route: PageRoute.Profile,
      type: PageType.Custom,
      component: () => <></>,
      roles: [UserRole.Admin, UserRole.Client],
    },
    {
      title: "Отчеты",
      icon: <PlayCircleFilled />,
      type: PageType.Parent,
      roles: [UserRole.Admin, UserRole.Client],
  
      pages: [
        {
          title: "Динамика результатов сканирований",
          route: PageRoute.Dynamic,
          type: PageType.Custom,
          component: () => <></>,
          roles: [UserRole.Admin, UserRole.Client]
        },
        {
          title: "Текущее состояние сети",
          route: PageRoute.Network,
          type: PageType.Custom,
          component: () => <></>,
          default: true,
          roles: [UserRole.Admin, UserRole.Client]
        },
        {
          title: "Сравнение по времени",
          route: PageRoute.Compare,
          type: PageType.Custom,
          component: () => <></>,
          roles: [UserRole.Admin, UserRole.Client]
        },
        {
          title: "Отчет по хостам",
          route: PageRoute.HostsReport,
          type: PageType.Custom,
          component: () => <></>,
          roles: [UserRole.Admin, UserRole.Client]
        }
      ]
    },
  ],
};
