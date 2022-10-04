import {
  getUpdatedSteps,
  Stepper as DataSetStepper,
  truthy,
  useStepper,
  useTranslation
} from '@okp4/ui'
import type {
  SelectValue,
  Step,
  UseState,
  UseTranslationResponse,
  UseStepper,
  DeepReadonly
} from '@okp4/ui'
import { useCallback, useMemo, useState } from 'react'
import { DataSpaceStep } from '../dataSpaceStep/DataSpaceStep'
import { FileSelectionStep } from '../fileSelectionStep/FileSelectionStep'
import type { Metadata } from '../metadataStep/MetadataStep'
import { MetadataStep } from '../metadataStep/MetadataStep'
import type { DatasetUploadStepContentType } from '../datasetUploadStep/DatasetUploadStep'
import { DatasetUploadStep } from '../datasetUploadStep/DatasetUploadStep'

// eslint-disable-next-line max-lines-per-function
export const Stepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [selectedDataSpace, setSelectedDataSpace]: UseState<SelectValue> = useState<SelectValue>('')
  const [isDataSpaceStepInError, setDataSpaceStepInError]: UseState<boolean> =
    useState<boolean>(false)
  const [metadata, setMetadata]: UseState<Metadata | undefined> = useState<Metadata | undefined>(
    undefined
  )
  const [isMetadataStepInError, setMetadataStepInError]: UseState<boolean> =
    useState<boolean>(false)

  const checkDataSpaceSelection = useCallback((): boolean => {
    setDataSpaceStepInError(!selectedDataSpace)
    return !!selectedDataSpace
  }, [selectedDataSpace])

  const checkMetadata = useCallback((): boolean => {
    const isEachMandatoryFieldFilledIn =
      !!metadata &&
      truthy(metadata.title) &&
      truthy(metadata.author) &&
      truthy(metadata.creator) &&
      truthy(metadata.category) &&
      truthy(metadata.licence)
    setMetadataStepInError(!isEachMandatoryFieldFilledIn)
    return isEachMandatoryFieldFilledIn
  }, [metadata])

  const [contentType, setContentType]: UseState<DatasetUploadStepContentType> =
    useState<DatasetUploadStepContentType>('summary')

  const steps: Step[] = useMemo(
    () => [
      {
        id: 'dataspace',
        label: t('stepper:dataset-deposit:steps:dataspace:title'),
        onValidate: checkDataSpaceSelection,
        content: (
          <DataSpaceStep
            hasError={isDataSpaceStepInError}
            onDataSpaceChange={setSelectedDataSpace}
            selectedDataSpace={selectedDataSpace}
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
            hasError={isMetadataStepInError}
            metadata={metadata}
            onChange={setMetadata}
          />
        ),
        onValidate: checkMetadata
      },
      {
        id: 'dataset-upload',
        label: t('stepper:dataset-deposit:steps:dataset-upload:title'),
        content: <DatasetUploadStep contentType={contentType} metadata={metadata} />
      }
    ],
    [
      checkDataSpaceSelection,
      checkMetadata,
      isDataSpaceStepInError,
      isMetadataStepInError,
      metadata,
      selectedDataSpace,
      contentType,
      t
    ]
  )

  const { state, dispatch }: UseStepper = useStepper(
    'dataspace',
    steps.map((step: DeepReadonly<Step>) => ({ id: step.id }))
  )

  const handlePrevious = useCallback(() => {
    dispatch({
      type: 'previousClicked'
    })
  }, [dispatch])

  const handleNext = useCallback(() => {
    const currentStep = steps.find((step: DeepReadonly<Step>) => step.id === state.currentStepId)
    const stepCompleted = currentStep && (!currentStep.onValidate || currentStep.onValidate())
    dispatch({
      type: stepCompleted ? 'stepCompleted' : 'stepFailed'
    })
  }, [dispatch, state.currentStepId, steps])

  const handleSubmit = useCallback(() => {
    setContentType('upload')
    dispatch({
      type: 'stepperSubmitted'
    })
  }, [dispatch])

  const handleReset = useCallback(() => {
    setContentType('summary')
    dispatch({
      type: 'stepperReset',
      payload: {
        initialCurrentStepId: 'dataspace',
        initialStepsStatus: steps.map((step: DeepReadonly<Step>) => ({ id: step.id }))
      }
    })
  }, [dispatch, steps])

  return (
    <DataSetStepper
      currentStepId={state.currentStepId}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onReset={handleReset}
      onSubmit={handleSubmit}
      steps={getUpdatedSteps(steps, state)}
    />
  )
}
