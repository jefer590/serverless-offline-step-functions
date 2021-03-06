import type { StateMachineDefinition } from './StateMachineDescription';
import { StateType } from '../stateTasks/StateType';
import { StatesErrors } from './StatesErrors';

export type StateInfo = {
  handlerPath: string;
  handlerName: string;
  environment: Record<string, string> | undefined;
};

type CommonStateDefinition = {
  Type: StateType;
  Next?: string;
  End: boolean;
  Comment?: string;
  InputPath?: string;
  OutputPath?: string;
};

export type FailStateDefinition = {
  Type: StateType;
  Comment?: string;
  Cause?: string;
  Error?: string;
};

export type SucceedStateDefinition = {
  Type: StateType;
};

export type ChoiceRule = {
  Variable: string;
  Next: string;
  And?: ChoiceRule[];
  BooleanEquals?: boolean;
  BooleanEqualsPath?: string;
  IsBoolean?: boolean;
  IsNull?: boolean;
  IsPresent?: boolean;
  IsString?: boolean;
  IsTimestamp?: boolean;
  Not?: ChoiceRule;
  NumericEquals?: number;
  NumericEqualsPath?: string;
  NumericGreaterThan?: number;
  NumericGreaterThanPath?: string;
  NumericGreaterThanEquals?: number;
  NumericGreaterThanEqualsPath?: string;
  NumericLessThan?: number;
  NumericLessThanPath?: string;
  NumericLessThanEquals?: number;
  NumericLessThanEqualsPath?: string;
  Or?: ChoiceRule[];
  StringEquals?: string;
  StringEqualsPath?: string;
  StringGreaterThan?: string;
  StringGreaterThanPath?: string;
  StringGreaterThanEquals?: string;
  StringGreaterThanEqualsPath?: string;
  StringLessThan?: string;
  StringLessThanPath?: string;
  StringLessThanEquals?: string;
  StringLessThanEqualsPath?: string;
  StringMatches?: string;
  TimestampEquals?: string;
  TimestampEqualsPath?: string;
  TimestampGreaterThan?: string;
  TimestampGreaterThanPath?: string;
  TimestampGreaterThanEquals?: string;
  TimestampGreaterThanEqualsPath?: string;
  TimestampLessThan?: string;
  TimestampLessThanPath?: string;
  TimestampLessThanEquals?: string;
  TimestampLessThanEqualsPath?: string;
};

export type ChoiceStateDefinition = CommonStateDefinition & {
  Choices: ChoiceRule[];
  Default?: string;
};

export type PassStateDefinition = CommonStateDefinition & {
  Result?: Record<any, unknown>;
  ResultPath?: string;
  Parameters?: string; // TODO: TBD
};

export type TaskRetryRule = {
  ErrorEquals: StatesErrors[];
  IntervalSeconds?: number;
  MaxAttempts?: number;
  BackoffRate?: number;
};

export type TaskCatchRule = {
  ErrorEquals: StatesErrors[];
  Next: string;
  ResultPath?: string;
};

type LambdaTaskStateParameters = {
  FunctionName?: string | { 'Fn::GetAtt': [string, string] };
  Payload?: Record<string, unknown>;
};

export type PayloadTemplateType = LambdaTaskStateParameters & Record<string, unknown>;

export type ResultSelectorType = Record<string, string>;

export type TaskStateDefinition = CommonStateDefinition & {
  Resource?: string;
  Parameters?: PayloadTemplateType;
  ResultPath?: string;
  ResultSelector?: ResultSelectorType;
  Retry?: TaskRetryRule[];
  Catch?: TaskCatchRule[];
  TimeoutSeconds?: number;
  TimeoutSecondsPath?: string;
  HeartbeatSeconds?: number;
  HeartbeatSecondsPath?: string;
};

export type MapStateDefinition = CommonStateDefinition & {
  Iterator: StateMachineDefinition;
  ItemsPath?: string;
  Parameters?: PayloadTemplateType;
  MaxConcurrency?: number;
  ResultPath?: string;
  ResultSelector?: ResultSelectorType;
  Retry?: TaskRetryRule[];
  Catch?: TaskCatchRule[];
};

export type WaitStateDefinition = CommonStateDefinition & {
  Seconds?: number;
  Timestamp?: string;
  SecondsPath?: string;
  TimestampPath?: string;
};

export type ParallelStateDefinition = CommonStateDefinition & {
  Branches: StateMachineDefinition[];
  ResultPath?: string;
  ResultSelector?: ResultSelectorType;
  Retry?: TaskRetryRule[];
  Catch?: TaskCatchRule[];
};

export type StateDefinition =
  | PassStateDefinition
  | MapStateDefinition
  | TaskStateDefinition
  | FailStateDefinition
  | SucceedStateDefinition
  | ChoiceStateDefinition;
