import type {
  DeepReadonly,
  SelectValue,
  Step,
  UseState,
  UseStepper,
  UseTranslationResponse
} from '@okp4/ui'
import {
  getActiveStepId,
  getUpdatedSteps,
  removeAllFiles,
  Stepper as DataSetStepper,
  truthy,
  useFileDispatch,
  useStepper,
  useTranslation
} from '@okp4/ui'
import { useCallback, useMemo, useState } from 'react'
import type { DatasetUploadStepContentType } from '../datasetUploadStep/DatasetUploadStep'
import { DatasetUploadStep } from '../datasetUploadStep/DatasetUploadStep'
import { DataspaceStep } from '../dataspaceStep/DataspaceStep'
import { FileSelectionStep } from '../fileSelectionStep/FileSelectionStep'
import type { Metadata } from '../metadataStep/MetadataStep'
import { MetadataStep } from '../metadataStep/MetadataStep'

type StepsState = {
  selectedDataspace: SelectValue
  isDataspaceStepInError: boolean
  metadata: Metadata
  isMetadataStepInError: boolean
  datasetUploadContentType: DatasetUploadStepContentType
}

const initialStepsState: StepsState = {
  selectedDataspace: '',
  isDataspaceStepInError: false,
  metadata: {
    title: '',
    author: '',
    creator: '',
    description: '',
    category: '',
    spatialCoverage: '',
    licence: ''
  },
  isMetadataStepInError: false,
  datasetUploadContentType: 'summary'
}

// eslint-disable-next-line max-lines-per-function
export const Stepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const fileDispatch = useFileDispatch()
  const [stepsState, setState]: UseState<StepsState> = useState(initialStepsState)

  const handleDataspaceChange = useCallback(
    (selectedDataspace: SelectValue) => {
      setState({ ...stepsState, selectedDataspace })
    },
    [stepsState]
  )

  const checkDataspaceSelection = useCallback((): boolean => {
    setState({ ...stepsState, isDataspaceStepInError: !stepsState.selectedDataspace })
    return !!stepsState.selectedDataspace
  }, [stepsState])

  const handleMetadataChange = useCallback(
    (metadata: Metadata) => {
      setState({ ...stepsState, metadata })
    },
    [stepsState]
  )

  const checkMetadata = useCallback((): boolean => {
    const isEachMandatoryFieldFilledIn =
      truthy(stepsState.metadata.title) &&
      truthy(stepsState.metadata.author) &&
      truthy(stepsState.metadata.creator) &&
      truthy(stepsState.metadata.category) &&
      truthy(stepsState.metadata.licence)
    setState({ ...stepsState, isMetadataStepInError: !isEachMandatoryFieldFilledIn })
    return isEachMandatoryFieldFilledIn
  }, [stepsState])

  const steps: Step[] = useMemo(
    () => [
      {
        id: 'dataspace',
        label: t('stepper:dataset-deposit:steps:dataspace:title'),
        onValidate: checkDataspaceSelection,
        content: (
          <DataspaceStep
            hasError={stepsState.isDataspaceStepInError}
            onChange={handleDataspaceChange}
            selectedDataspace={stepsState.selectedDataspace}
          />
        )
      },
      {
        id: 'file-selection',
        label: t('stepper:dataset-deposit:steps:file-selection:title'),
        content: <FileSelectionStep />
      },
      {
        id: 'metadata',
        label: t('stepper:dataset-deposit:steps:metadata:title'),
        content: (
          <MetadataStep
            hasError={stepsState.isMetadataStepInError}
            metadata={stepsState.metadata}
            onChange={handleMetadataChange}
          />
        ),
        onValidate: checkMetadata
      },
      {
        id: 'dataset-upload',
        label: t('stepper:dataset-deposit:steps:dataset-upload:title'),
        content: (
          <DatasetUploadStep
            contentType={stepsState.datasetUploadContentType}
            metadata={stepsState.metadata}
          />
        )
      }
    ],
    [
      t,
      checkDataspaceSelection,
      stepsState,
      handleDataspaceChange,
      handleMetadataChange,
      checkMetadata
    ]
  )

  const { state, dispatch, error }: UseStepper = useStepper(
    steps.map((step: DeepReadonly<Step>) => ({
      id: step.id,
      status: step.status ?? 'uncompleted'
    })),
    'dataspace'
  )

  const handlePrevious = useCallback(() => {
    getActiveStepId(state) === steps.at(-1)?.id &&
      setState({ ...stepsState, datasetUploadContentType: 'summary' })
    dispatch({
      type: 'previousClicked'
    })
  }, [dispatch, state, steps, stepsState])

  const handleNext = useCallback(() => {
    const currentStep = steps.find((step: DeepReadonly<Step>) => step.id === getActiveStepId(state))
    const stepCompleted = currentStep && (!currentStep.onValidate || currentStep.onValidate())
    dispatch({
      type: stepCompleted ? 'stepCompleted' : 'stepFailed'
    })
  }, [dispatch, state, steps])

  const handleSubmit = useCallback(() => {
    setState({ ...stepsState, datasetUploadContentType: 'success' })
    dispatch({
      type: 'stepperSubmitted'
    })
  }, [dispatch, stepsState])

  const handleReset = useCallback(() => {
    setState(initialStepsState)
    fileDispatch(removeAllFiles())
    dispatch({
      type: 'stepperReset'
    })
  }, [dispatch, fileDispatch])

  return (
    <div className="okp4-stepper-container">
      {!error && (
        <DataSetStepper
          activeStepId={getActiveStepId(state)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onReset={handleReset}
          onSubmit={handleSubmit}
          resetButtonLabel={t('stepper:dataset-deposit:button:reset')}
          steps={getUpdatedSteps(steps, state)}
          submitButtonLabel={t('stepper:dataset-deposit:button:submit')}
        />
      )}
    </div>
  )
}
