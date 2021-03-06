import { ExecutionContext } from './ExecutionContext';
import { MapContext } from './MapContext';
import { StateContext } from './StateContext';
import { StateMachineContext } from './StateMachineContext';
import { TaskContext } from './TaskContext';

export class Context {
  private _mapContex?: MapContext;

  constructor(
    private readonly _executionContext: ExecutionContext,
    private readonly _stateMachineContext: StateMachineContext,
    private _stateContext: StateContext,
    private _taskContext: TaskContext,
  ) {}

  public static create(
    executionContext: ExecutionContext,
    stateMachineContext: StateMachineContext,
    stateContext: StateContext,
    taskContext: TaskContext = TaskContext.create(),
  ): Context {
    return new Context(executionContext, stateMachineContext, stateContext, taskContext);
  }

  get Execution(): ExecutionContext {
    return this._executionContext;
  }

  get StateMachine(): StateMachineContext {
    return this._stateMachineContext;
  }

  get State(): StateContext {
    return this._stateContext;
  }

  get Task(): TaskContext {
    return this._taskContext;
  }

  get Map(): MapContext | undefined {
    return this._mapContex;
  }

  public clone(): Context {
    return new Context(this._executionContext, this._stateMachineContext, this._stateContext, this._taskContext);
  }

  public startMapItration(iterationIndex: number, iterationInputValue: string): void {
    this._mapContex = MapContext.create(iterationIndex, iterationInputValue);
  }

  transitionTo(state: StateContext, task: TaskContext = TaskContext.create()): void {
    this._stateContext = state;
    this._taskContext = task;
  }
}
