import React, { useRef, useState, useEffect } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ArrowBack from '@material-ui/icons/ArrowBack';

import { Board } from '../board';
import { Arrow } from '../../graphic/arrow';

interface ProcessProps {
  process: Step;
}

export const Process = (props: ProcessProps) => {
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

export const Graph = ({ process }: ProcessProps) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <StepBlock {...process} />
      </div>
    </>
  );
};

interface Step {
  item?: Entity;

  paths?: Step[];

  parentTop?: number;
}

export const StepBlock = ({ item, paths, parentTop }: Step) => {
  const currentStep = useRef<HTMLDivElement | null>(null);
  const currentLevel = useRef<HTMLDivElement | null>(null);

  const [currentTop, setCurrentTop] = useState<number>();

  useEffect(() => {
    if (currentStep && currentLevel) {
      setTimeout(() => {
        setCurrentTop(currentStep.current!.offsetTop + currentLevel.current!.offsetTop);
      }, 100);
    }
  }, [currentStep, currentLevel]);

  console.log(currentTop, parentTop);

  return (
    <div ref={currentLevel} style={{ display: "flex", alignItems: "center", flexGrow: 1, position: "relative" }}>
      {item && (
        <div ref={currentStep} style={{ display: "flex", position: "relative" }}>
          {(parentTop !== undefined) && (currentTop !== undefined) && (
            <div style={{
              position: "absolute",
              left: "-9rem",
              top: currentTop <= parentTop ? currentStep.current!.clientHeight / 2 + 'px' : currentStep.current!.clientHeight / 2 - Math.max(Math.abs(parentTop - currentTop), 5) + 'px'
            }}>
              <Arrow up={currentTop < parentTop} width={128} height={Math.max(Math.abs(parentTop - currentTop), 5)} color="#f00" />
            </div>
          )}

          <EntityBlock {...item} />
        </div>
      )}
      
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "10rem" }}>
        {paths?.map((step, j) => (
          <StepBlock
            {...step}
            parentTop={currentStep.current?.offsetTop}
          />
        ))}
      </div>
    </div>
  )
}



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

const EntityBlock = ({ id, label, status, progress, account }: Entity) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", margin: "2rem 0" }}>
      <TrafficLight value={TrafficLightValue.Success} />

      <div style={{
        width: "10rem",
        padding: "0.25rem",
        margin: "0.25rem 0",
        height: "10rem",
        border: "0.125rem solid #06b",
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

        <Progress value={progress} width={120} color="#080" />

        <div style={{ height: "0.125rem", backgroundColor: "#06b", marginBottom: "0.5rem" }} />

        {status}
        <br />
        Ответственный:
        <br />
        {account}
      </div>
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

enum TrafficLightValue {
  Success = "Success",
  Warning = "Warning",
  Danger = "Danger"
}

interface TrafficLightProps {
  value: TrafficLightValue
}

const TrafficLight = ({ value }: TrafficLightProps) => {
  return (
    <div
      style={{
        display: "flex",
        border: "0.125rem solid #ccc",
        borderRadius: "0.75rem",
        padding: "0.25rem",
        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ borderRadius: "50%", width: "0.75rem", height: "0.75rem", backgroundColor: value === TrafficLightValue.Danger ? "#a00" : "#ccc" }} />
      <div style={{ borderRadius: "50%", width: "0.75rem", height: "0.75rem", backgroundColor: value === TrafficLightValue.Warning ? "#ca0" : "#ccc", margin: "0 0.25rem" }} />
      <div style={{ borderRadius: "50%", width: "0.75rem", height: "0.75rem", backgroundColor: value === TrafficLightValue.Success ? "#080" : "#ccc" }} />
    </div>
  )
}
