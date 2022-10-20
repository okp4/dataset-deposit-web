import { Select, TextField, Typography, useTranslation } from '@okp4/ui'
import type {
  UseTranslationResponse,
  SelectValue,
  DeepReadonly,
  SelectOption,
  UseReducer
} from '@okp4/ui'
import type { ChangeEvent } from 'react'
import { useCallback, useReducer, useEffect, useMemo } from 'react'

export type Metadata = DeepReadonly<{
  title: string
  author: string
  creator: string
  description: string
  category: string | string[]
  spatialCoverage: string | string[]
  licence: string | string[]
}>

const initialState: Metadata = {
  title: '',
  author: '',
  creator: '',
  description: '',
  category: '',
  spatialCoverage: '',
  licence: ''
}

type TextFieldActionType =
  | 'titleChanged'
  | 'authorChanged'
  | 'creatorChanged'
  | 'descriptionChanged'
type TextFieldAction = { type: TextFieldActionType; payload: string }
type SelectActionType = 'categoryChanged' | 'spatialCoverageChanged' | 'licenceChanged'
type SelectAction = { type: SelectActionType; payload: string | string[] }
type StepAction = TextFieldAction | SelectAction

const reducer = (state: Metadata, action: DeepReadonly<StepAction>): Metadata => {
  switch (action.type) {
    case 'titleChanged':
      return {
        ...state,
        title: action.payload
      }
    case 'authorChanged':
      return {
        ...state,
        author: action.payload
      }
    case 'creatorChanged':
      return {
        ...state,
        creator: action.payload
      }
    case 'descriptionChanged':
      return {
        ...state,
        description: action.payload
      }
    case 'categoryChanged':
      return {
        ...state,
        category: action.payload
      }
    case 'spatialCoverageChanged':
      return {
        ...state,
        spatialCoverage: action.payload
      }
    case 'licenceChanged':
      return {
        ...state,
        licence: action.payload
      }
    default:
      return state
  }
}

type MetadataStepProps = {
  readonly metadata?: Metadata
  readonly hasError: boolean
  readonly onChange: (metadata: DeepReadonly<Metadata>) => void
}

// eslint-disable-next-line max-lines-per-function
export const MetadataStep = ({
  metadata,
  hasError,
  onChange
}: DeepReadonly<MetadataStepProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const [state, dispatch]: UseReducer<Metadata, DeepReadonly<StepAction>> = useReducer(
    reducer,
    metadata ?? initialState
  )

  const categoryOptions: SelectOption[] = useMemo(
    () => [
      {
        label: t(
          'stepper:dataset-deposit:steps:metadata:category-options:agriculture-environment-forestry'
        ),
        value: 'agriculture-environment-forestry'
      },
      {
        label: t(
          'stepper:dataset-deposit:steps:metadata:category-options:biology-geology-chemistry'
        ),
        value: 'biology-geology-chemistry'
      },
      {
        label: t(
          'stepper:dataset-deposit:steps:metadata:category-options:industry-mobility-engineering'
        ),
        value: 'industry-mobility-engineering'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:category-options:logistics-ecommerce'),
        value: 'logistics-eCommerce'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:category-options:defi-crypto'),
        value: 'defi-crypto'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:category-options:healthcare'),
        value: 'healthcare'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:category-options:business-purchase'),
        value: 'business-purchase'
      },
      {
        label: t(
          'stepper:dataset-deposit:steps:metadata:category-options:marketing-customer-behavior'
        ),
        value: 'marketing-customer-behavior'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:category-options:energy'),
        value: 'energy'
      },
      { label: t('stepper:dataset-deposit:steps:metadata:category-options:other'), value: 'other' }
    ],
    [t]
  )

  const licenceOptions: SelectOption[] = useMemo(
    () => [
      {
        label: t('stepper:dataset-deposit:steps:metadata:licence-options:etalab-2.0'),
        value: 'etalab-2.0'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:licence-options:odbl-1.0'),
        value: 'odbl-1.0'
      },
      {
        label: t('stepper:dataset-deposit:steps:metadata:licence-options:other-open-access-data'),
        value: 'other-open-access-data'
      },
      {
        label: t(
          'stepper:dataset-deposit:steps:metadata:licence-options:other-private-access-data'
        ),
        value: 'other-private-access-data'
      }
    ],
    [t]
  )

  const handleFieldChange = useCallback(
    (type: DeepReadonly<TextFieldActionType>) =>
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({ type, payload: event.target.value })
      },
    []
  )

  const handleSelectChange = useCallback(
    (type: DeepReadonly<SelectActionType>) => (value: SelectValue) => {
      dispatch({ type, payload: value })
    },
    []
  )

  useEffect(() => {
    onChange(state)
  }, [onChange, state])

  const element = document.querySelector('.okp4-metadata-step-main')
  useEffect(() => {
    element?.scrollIntoView({
      behavior: 'auto',
      block: 'start'
    })
  }, [element])

  return (
    <div className="okp4-metadata-step-main">
      <Typography as="div" fontSize="small">
        <div className="okp4-dataspace-step-description">
          {t('stepper:dataset-deposit:steps:metadata:description')}
        </div>
      </Typography>
      <div className="okp4-metadata-step-container">
        <TextField
          fullWidth
          hasError={hasError && !state.title}
          onChange={handleFieldChange('titleChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:title')}
          value={state.title}
          withBorder
        />
        <TextField
          fullWidth
          hasError={hasError && !state.author}
          onChange={handleFieldChange('authorChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:author')}
          value={state.author}
          withBorder
        />
        <TextField
          fullWidth
          hasError={hasError && !state.creator}
          onChange={handleFieldChange('creatorChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:creator')}
          value={state.creator}
          withBorder
        />
        <TextField
          fullWidth
          multiline
          numberOfLines={10}
          onChange={handleFieldChange('descriptionChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:description')}
          value={state.description}
          withBorder
        />
        <Select
          fullWidth
          hasError={hasError && !state.category}
          onChange={handleSelectChange('categoryChanged')}
          options={categoryOptions}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:category')}
          size="medium"
          value={state.category}
        />
        <Select
          disabled
          fullWidth
          onChange={handleSelectChange('spatialCoverageChanged')}
          options={[]}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:spatial-coverage')}
          size="medium"
          value={state.spatialCoverage}
        />
        <Select
          fullWidth
          hasError={hasError && !state.licence}
          onChange={handleSelectChange('licenceChanged')}
          options={licenceOptions}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:licence')}
          size="medium"
          value={state.licence}
        />
      </div>
    </div>
  )
}
