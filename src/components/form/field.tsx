import React, { useEffect } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import format from 'date-fns/format';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';

import { Autocomplete } from '../domain';

import { MonthNames } from '../../constants/scan/enums';

import { useSource } from '../../hooks/useSource';

import { TextField } from '../domain';
import { TextFieldProps } from '@material-ui/core';

export enum FieldType {
  Select = 'Select',
  DateTime = 'DateTime',
  Date = 'Date',
  Time = 'Time',
  Number = 'Number',
}

interface AbstractFieldProps<T> {
  label: string;
  size?: TextFieldProps['size'];
  value?: T;
  error?: string;
  type?: FieldType;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onChange?(value: T): void;
}

interface SelectProps<T> extends AbstractFieldProps<T> {
  type: FieldType.Select;
  source: () => Promise<T[]>;
  onChange(value: T): void;
}

interface DateTimeProps extends AbstractFieldProps<string | undefined | null> {
  type: FieldType.DateTime;
}

type FieldProps<T> = AbstractFieldProps<T> | SelectProps<T>;

export function Field<T>(props: FieldProps<T>) {
  if (props.type === FieldType.Select) {
    return <Select {...(props as SelectProps<T & { id: string | number; name: string }>)} />;
  }

  if (props.type && [FieldType.DateTime, FieldType.Date, FieldType.Time].includes(props.type)) {
    return <DateTime {...(props as DateTimeProps)} />;
  }

  return <Text {...(props as any)} />;
}

function Select<T extends { id: string | number; name: string }>({
  label,
  source,
  error,
  value,
  disabled,
  readOnly,
  required,
  onChange,
}: Omit<SelectProps<T>, 'type'>) {
  const { data, loading, error: isError } = useSource(() => source(), [source]);

  useEffect(() => {
    if (data?.length === 1 && value !== data[0] && !disabled) {
      onChange(data?.[0]);
    }
  }, [data, disabled, onChange, value]);

  return data ? (
    <Autocomplete
      label={label}
      value={data.find((i) => i.id === value?.id) ?? null}
      options={data as T[]}
      multiple={false}
      loading={loading || isError}
      required={required}
      disabled={disabled || loading || isError}
      readOnly={readOnly}
      disableClearable={required}
      error={!!error}
      helperText={error}
      getOptionLabel={(item) => item.name}
      onChange={(e, value) => onChange?.(value as T)}
    />
  ) : null;
}

function Text({ label, size, error, value, disabled, readOnly, required, onChange }: Omit<FieldProps<string>, 'type'>) {
  return (
    <TextField
      size={size}
      label={label}
      value={value}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      error={!!error}
      helperText={error}
      onChange={(e) => onChange?.(e.currentTarget.value)}
    />
  );
}

const DateTimeControls = {
  [FieldType.DateTime]: KeyboardDateTimePicker,
  [FieldType.Date]: KeyboardDatePicker,
  [FieldType.Time]: KeyboardTimePicker,
};

const DateTimeFormats = {
  [FieldType.DateTime]: 'yyyy.MM.dd HH:mm',
  [FieldType.Date]: 'yyyy.MM.dd',
  [FieldType.Time]: 'HH:mm',
};

function DateTime({ label, error, value, disabled, type, readOnly, required, onChange }: DateTimeProps) {
  const Picker = DateTimeControls[type];
  const format = DateTimeFormats[type];

  return (
    <MuiPickersUtilsProvider locale={ruLocale} utils={LocalizedDateFnsUtils}>
      <Picker
        variant="inline"
        ampm={false}
        required={required}
        disabled={disabled}
        label={label}
        error={!!error}
        helperText={error}
        value={value}
        inputProps={{
          id: 'readOnly',
        }}
        InputProps={{
          id: 'readOnly',
          className: readOnly ? 'readOnly' : undefined,
        }}
        onChange={(_date, value) => {
          let fresh;

          try {
            fresh = value && new Date(value).toISOString();
          } catch {
            fresh = undefined;
          }

          onChange?.(fresh);
        }}
        // disablePast
        format={format}
      />
    </MuiPickersUtilsProvider>
  );
}

class LocalizedDateFnsUtils extends DateFnsUtils {
  public getCalendarHeaderText(date: Date) {
    return Object.values(MonthNames)[date.getMonth()] + ' ' + format(date, 'yyyy', { locale: this.locale });
  }
}
