import { List } from 'immutable'
import {
  createEventBusInstance,
  FileContext,
  FileStoreBuilder,
  ErrorStoreBuilder,
  ErrorContext,
  TaskContext,
  TaskStoreBuilder
} from '@okp4/ui'
import type { StoreParameter } from '@okp4/ui'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const storeParameters = (): List<StoreParameter> => {
  const eventBusInstance = createEventBusInstance()

  // File
  const fileStore = new FileStoreBuilder().withEventBus(eventBusInstance).build()
  const fileStoreParameter: StoreParameter = [FileContext, fileStore]

  // Error
  const errorStore = new ErrorStoreBuilder().withEventBus(eventBusInstance).build()
  const errorStoreParameter: StoreParameter = [ErrorContext, errorStore]

  // Task
  const taskStore = new TaskStoreBuilder().withEventBus(eventBusInstance).build()
  const taskStoreParameter: StoreParameter = [TaskContext, taskStore]

  return List([fileStoreParameter, errorStoreParameter, taskStoreParameter])
}
