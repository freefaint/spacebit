import { FC, ReactNode } from 'react';

import { UserRole } from './';

export enum PageType {
  Registry,
  Custom,
  Parent,
}

export enum EntityType {
  User = 'User',
  Scan = 'Scan',
  Organization = 'Organization',
}

export enum PageRoute {
  Users = 'users',
  Profile = 'profile',
  Dynamic = 'dynamic',
  Network = 'network',
  Compare = 'compare',
  HostsReport = 'hosts_report',
  Scans = 'scans',
  Organizations = 'organizations',
}

export interface AbstractPageSchema {
  title?: string;
  icon?: ReactNode;
  type: PageType;
  default?: boolean;
  route?: PageRoute;
  roles: UserRole[];
}

export type PageSchema = AbstractPageSchema;

export interface RegistryPageSchema extends PageSchema {
  type: PageType.Registry;
}

export interface CustomPageSchema extends PageSchema {
  type: PageType.Custom;
  component: FC<{ onChange: () => void }>;
}

export interface ParentPageSchema extends PageSchema {
  type: PageType.Parent;
  pages: CustomPageSchema[];
}

export type SiteLocation = RegistryPageSchema | CustomPageSchema | ParentPageSchema;
export type Sitemap = SiteLocation[];
