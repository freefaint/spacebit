import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EntityStatus, EntityType, Process } from '../components/graph';

export default {
  title: 'Example/ProcessCard',
  component: Process,
} as ComponentMeta<typeof Process>;

const Template: ComponentStory<typeof Process> = (args) => <Process {...args} />;

function factory<T>(fn: () => T, count?: number) {
  return new Array(Math.ceil(count ?? Math.random() * 2)).fill(true).map(fn);
}

export const Default = Template.bind({});
Default.args = {
  process: {
    item: {
      id: 1234,
      entityType: EntityType.BUSINESS_TASK,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },

    paths: factory(() => ({
      item: {
        id: 2345,
        entityType: EntityType.EXPLORATION,
        label: 'exploration 1',
        status: EntityStatus.Completed,
        progress: 100,
      },

      paths: factory(() => ({
        item: {
          id: 3234,
          entityType: EntityType.MODEL,
          label: 'task 1',
          status: EntityStatus.Work,
          progress: 86,
        },

        paths: factory(() => ({
          item: {
            id: 3234,
            entityType: EntityType.MODEL_VERSION,
            label: 'task 1',
            status: EntityStatus.Work,
            progress: 86,
          },

          paths: factory(() => ({
            item: {
              id: 3234,
              entityType: EntityType.PROMVERSION,
              label: 'task 1',
              status: EntityStatus.Work,
              progress: 86,
            },

            paths: factory(() => ({
              item: {
                id: 3237,
                entityType: EntityType.IMPLEMENTATION,
                label: 'task 4',
                status: EntityStatus.Work,
                progress: 92,
              },
            })),
          })),
        })),
      })),
    })),
  },
};
