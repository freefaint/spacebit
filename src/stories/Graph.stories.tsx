import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EntityStatus, EntityType, ProcessCard } from '../components/graph';

export default {
  title: 'Example/ProcessCard',
  component: ProcessCard,
} as ComponentMeta<typeof ProcessCard>;

const Template: ComponentStory<typeof ProcessCard> = (args) => <ProcessCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  scheme: {
    columns: [
      {
        entityType: EntityType.BUSINESS_TASK,
      },
      {
        entityType: EntityType.EXPLORATION,
      },
      {
        entityType: EntityType.MODEL,
      },
      {
        entityType: EntityType.MODEL_VERSION,
      },
      {
        entityType: EntityType.PROMVERSION,
      },
      {
        entityType: EntityType.IMPLEMENTATION,
      },
    ],
  },

  entities: [
    {
      id: 1234,
      entityType: EntityType.BUSINESS_TASK,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },
    {
      id: 1235,
      entityType: EntityType.BUSINESS_TASK,
      label: 'task 2',
      status: EntityStatus.Work,
      progress: 45,
    },
    {
      id: 1236,
      entityType: EntityType.BUSINESS_TASK,
      label: 'task 3',
      status: EntityStatus.Work,
      progress: 56,
    },
    {
      id: 1237,
      entityType: EntityType.BUSINESS_TASK,
      label: 'task 4',
      status: EntityStatus.Work,
      progress: 92,
    },



    {
      id: 2345,
      entityType: EntityType.EXPLORATION,
      label: 'exploration 1',
      status: EntityStatus.Completed,
      progress: 100,
    },
    {
      id: 2346,
      entityType: EntityType.EXPLORATION,
      label: 'exploration 2',
      status: EntityStatus.Completed,
      progress: 100,
    },
    {
      id: 2345,
      entityType: EntityType.EXPLORATION,
      label: 'exploration 1',
      status: EntityStatus.Completed,
      progress: 100,
    },
    {
      id: 2346,
      entityType: EntityType.EXPLORATION,
      label: 'exploration 2',
      status: EntityStatus.Completed,
      progress: 100,
    },
    {
      id: 2345,
      entityType: EntityType.EXPLORATION,
      label: 'exploration 1',
      status: EntityStatus.Completed,
      progress: 100,
    },
    {
      id: 2346,
      entityType: EntityType.EXPLORATION,
      label: 'exploration 2',
      status: EntityStatus.Completed,
      progress: 100,
    },



    {
      id: 3234,
      entityType: EntityType.MODEL,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },
    {
      id: 3235,
      entityType: EntityType.MODEL,
      label: 'task 2',
      status: EntityStatus.Work,
      progress: 45,
    },
    {
      id: 3236,
      entityType: EntityType.MODEL,
      label: 'task 3',
      status: EntityStatus.Work,
      progress: 56,
    },
    {
      id: 3237,
      entityType: EntityType.MODEL,
      label: 'task 4',
      status: EntityStatus.Work,
      progress: 92,
    },



    {
      id: 3234,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },
    {
      id: 3235,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 2',
      status: EntityStatus.Work,
      progress: 45,
    },
    {
      id: 3236,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 3',
      status: EntityStatus.Work,
      progress: 56,
    },
    {
      id: 3237,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 4',
      status: EntityStatus.Work,
      progress: 92,
    },
    {
      id: 3234,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },
    {
      id: 3235,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 2',
      status: EntityStatus.Work,
      progress: 45,
    },
    {
      id: 3236,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 3',
      status: EntityStatus.Work,
      progress: 56,
    },
    {
      id: 3237,
      entityType: EntityType.MODEL_VERSION,
      label: 'task 4',
      status: EntityStatus.Work,
      progress: 92,
    },



    {
      id: 3234,
      entityType: EntityType.PROMVERSION,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },



    {
      id: 3235,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 2',
      status: EntityStatus.Work,
      progress: 45,
    },
    {
      id: 3236,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 3',
      status: EntityStatus.Work,
      progress: 56,
    },
    {
      id: 3237,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 4',
      status: EntityStatus.Work,
      progress: 92,
    },
    {
      id: 3234,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 1',
      status: EntityStatus.Work,
      progress: 86,
    },
    {
      id: 3235,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 2',
      status: EntityStatus.Work,
      progress: 45,
    },
    {
      id: 3236,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 3',
      status: EntityStatus.Work,
      progress: 56,
    },
    {
      id: 3237,
      entityType: EntityType.IMPLEMENTATION,
      label: 'task 4',
      status: EntityStatus.Work,
      progress: 92,
    },
  ],
};
