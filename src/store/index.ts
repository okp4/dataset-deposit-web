import { List } from 'immutable'
import {
  createEventBusInstance,
  FileStoreBuilder,
  FileContext,
  ErrorStoreBuilder,
  ErrorContext
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

  return List([fileStoreParameter, errorStoreParameter])
}
