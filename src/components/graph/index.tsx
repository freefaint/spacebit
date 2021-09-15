import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { Board } from '../board';

type EntityID = number;

export enum EntityStatus {
  Work = 'Work',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  ReadyToDeploy = 'ReadyToDeploy',
}

export enum EntityType {
  MODEL = 'MODEL',
  BUSINESS_TASK = 'BUSINESS_TASK',
  EXPLORATION = 'EXPLORATION',
  MODEL_VERSION = 'MODEL_VERSION',
  PROMVERSION = 'PROMVERSION',
  IMPLEMENTATION = 'IMPLEMENTATION',
}

interface Entity {
  id: EntityID;
  entityType: EntityType;
  label: string;
  status: EntityStatus;
  progress: number;
  account?: string;
}

export const ProcessCard = (props: GraphProps) => {
  return (
    <Board
      title={
        <Button variant="contained" startIcon={<ArrowBack />}>
          Назад
        </Button>
      }
      operations={(operations) => (
        <ButtonGroup variant="contained">
          <Button size="small" onClick={operations.handlePlus}>
            <PlusIcon />
          </Button>
          <Button size="small" onClick={operations.handleMinus}>
            <MinusIcon />
          </Button>
          <Button size="small" onClick={operations.handleFit}>
            <AspectRatioIcon />
          </Button>
          <Button size="small" onClick={operations.handleOriginal}>
            100%
          </Button>
        </ButtonGroup>
      )}
    >
      <Graph {...props} />
    </Board>
  );
};

interface GraphProps {
  scheme: {
    columns: {
      entityType: EntityType;
    }[];
  };

  entities: Entity[];
}

export const Graph = ({ scheme: { columns }, entities }: GraphProps) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        {columns.map(i => (
          <div style={{ display: "flex", flexDirection: "column", margin: "0 4rem" }}>
            {entities.filter(j => j.entityType === i.entityType).map(entity => (
              <EntityBlock {...entity} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const EntityBlock = ({ id, label, status, progress, account }: Entity) => {
  return (
    <div style={{
      width: "10rem",
      padding: "0.25rem",
      margin: "2rem 0",
      height: "10rem",
      border: "0.125rem solid #085",
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      fontSize: "0.875rem",
      fontFamily: 'sans-serif',
      textAlign: "center",
      lineHeight: "1.25rem"
    }}>
      <strong>
        {label}
        <br />
        (ID {id})
      </strong>

      <Progress value={progress} width={120} color="#0af" />

      <div style={{ height: "2px", backgroundColor: "#000", marginBottom: "0.5rem" }} />

      {status}
      <br />
      Ответственный:
      <br />
      {account}
    </div>
  );
}

interface ProgressProps {
  value: number;
  color: string;
  width: number;
}

const Progress = ({ value, width, color }: ProgressProps) => {
  return (
    <div style={{ width: "8.5rem", margin: "0.5rem auto", height: "0.1875rem", backgroundColor: "#aaa" }}>
      <div style={{ width: (((value / 100) * width) / 16) + "rem", height: "0.1875rem", backgroundColor: color }}></div>
    </div>
  )
}