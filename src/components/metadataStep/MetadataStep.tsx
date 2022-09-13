import { Select, TextField, Typography, useTranslation } from '@okp4/ui'
import type {
  UseTranslationResponse,
  SelectValue,
  DeepReadonly,
  SelectOption,
  UseReducer
} from '@okp4/ui'
import type { ChangeEvent } from 'react'
import { useCallback, useReducer, useEffect } from 'react'

export type Metadata = {
  datasetTitle: string
  author: string
  creator: string
  description: string
  category: string | readonly string[]
  spatialCoverage: string | readonly string[]
  licence: string | readonly string[]
}

const initialState: Metadata = {
  datasetTitle: '',
  author: '',
  creator: '',
  description: '',
  category: '',
  spatialCoverage: '',
  licence: ''
}

type TextFieldActionType =
  | 'datasetTitleChanged'
  | 'authorChanged'
  | 'creatorChanged'
  | 'descriptionChanged'
type TextFieldAction = { type: TextFieldActionType; payload: string }
type SelectActionType = 'categoryChanged' | 'spatialCoverageChanged' | 'licenceChanged'
type SelectAction = { type: SelectActionType; payload: string | string[] }
type StepAction = TextFieldAction | SelectAction

const reducer = (
  state: DeepReadonly<Metadata>,
  action: DeepReadonly<StepAction>
): DeepReadonly<Metadata> => {
  switch (action.type) {
    case 'datasetTitleChanged':
      return {
        ...state,
        datasetTitle: action.payload
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

const categoryOptions: SelectOption[] = [
  {
    label: 'Agriculture, environment and forestry',
    value: 'Agriculture, environment and forestry'
  },
  { label: 'Biology, geology, and chemistry', value: 'Biology, geology, and chemistry' },
  { label: 'Industry, mobility, and engineering', value: 'Industry, mobility, and engineering' },
  { label: 'Logistics and eCommerce', value: 'Logistics and eCommerce' },
  { label: 'DeFi and Crypto', value: 'DeFi and Crypto' },
  { label: 'Healthcare', value: 'Healthcare' },
  { label: 'Business and purchase', value: 'Business and purchase' },
  { label: 'Marketing and Customer Behavior', value: 'Marketing and Customer Behavior' },
  { label: 'Energy', value: 'Energy' },
  { label: 'Other', value: 'Other' }
]

const licenceOptions: SelectOption[] = [
  { label: 'Etalab 2.0', value: 'Etalab 2.0' },
  { label: 'ODbL-1.0', value: 'ODbL-1.0' },
  { label: 'Other Open access data', value: 'Other Open access data' },
  { label: 'Other Private access data', value: 'Other Private access data' }
]

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
          hasError={hasError && !state.datasetTitle}
          onChange={handleFieldChange('datasetTitleChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:dataset-title')}
          value={state.datasetTitle}
        />
        <TextField
          fullWidth
          hasError={hasError && !state.author}
          onChange={handleFieldChange('authorChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:author')}
          value={state.author}
        />
        <TextField
          fullWidth
          hasError={hasError && !state.creator}
          onChange={handleFieldChange('creatorChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:creator')}
          value={state.creator}
        />
        <TextField
          fullWidth
          multiline
          numberOfLines={10}
          onChange={handleFieldChange('descriptionChanged')}
          placeholder={t('stepper:dataset-deposit:steps:metadata:form:description')}
          value={state.description}
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
