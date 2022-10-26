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
import { DataSpaceStep } from '../dataSpaceStep/DataSpaceStep'
import { FileSelectionStep } from '../fileSelectionStep/FileSelectionStep'
import type { Metadata } from '../metadataStep/MetadataStep'
import { initialMetadata, MetadataStep } from '../metadataStep/MetadataStep'

// eslint-disable-next-line max-lines-per-function
export const Stepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [selectedDataSpace, setSelectedDataSpace]: UseState<SelectValue> = useState<SelectValue>('')
  const [isDataSpaceStepInError, setDataSpaceStepInError]: UseState<boolean> =
    useState<boolean>(false)
  const fileDispatch = useFileDispatch()
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

  const { state, dispatch, error }: UseStepper = useStepper(
    steps.map((step: DeepReadonly<Step>) => ({
      id: step.id,
      status: step.status ?? 'uncompleted'
    })),
    'dataspace'
  )

  const handlePrevious = useCallback(() => {
    getActiveStepId(state) === steps.at(-1)?.id && setContentType('summary')
    dispatch({
      type: 'previousClicked'
    })
  }, [dispatch, state, steps])

  const handleNext = useCallback(() => {
    const currentStep = steps.find((step: DeepReadonly<Step>) => step.id === getActiveStepId(state))
    const stepCompleted = currentStep && (!currentStep.onValidate || currentStep.onValidate())
    dispatch({
      type: stepCompleted ? 'stepCompleted' : 'stepFailed'
    })
  }, [dispatch, state, steps])

  const handleSubmit = useCallback(() => {
    setContentType('success')
    dispatch({
      type: 'stepperSubmitted'
    })
  }, [dispatch])

  const handleReset = useCallback(() => {
    setSelectedDataSpace('')
    fileDispatch(removeAllFiles())
    setMetadata(initialMetadata)
    setContentType('summary')
    dispatch({
      type: 'stepperReset'
    })
  }, [dispatch, fileDispatch])

  return (
    <div>
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
