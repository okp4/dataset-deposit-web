import { Stepper as DataSetStepper, truthy, useTranslation } from '@okp4/ui'
import type { SelectValue, Step, UseState, UseTranslationResponse } from '@okp4/ui'
import { useState } from 'react'
import { DataSpaceStep } from '../dataSpaceStep/DataSpaceStep'
import { FileSelectionStep } from '../fileSelectionStep/FileSelectionStep'
import type { Metadata } from '../metadataStep/MetadataStep'
import { MetadataStep } from '../metadataStep/MetadataStep'
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

  const checkDataSpaceSelection = (): boolean => {
    setDataSpaceStepInError(!selectedDataSpace)
    return !!selectedDataSpace
  }

  const checkMetadata = (): boolean => {
    const isEachMandatoryFieldFilledIn =
      !!metadata &&
      truthy(metadata.title) &&
      truthy(metadata.author) &&
      truthy(metadata.creator) &&
      truthy(metadata.category) &&
      truthy(metadata.licence)
    setMetadataStepInError(!isEachMandatoryFieldFilledIn)
    return isEachMandatoryFieldFilledIn
  }

  const steps: Step[] = [
    {
      label: t('stepper:dataset-deposit:steps:dataspace:title'),
      onValidate: checkDataSpaceSelection,
      status: 'active',
      content: (
        <DataSpaceStep
          hasError={isDataSpaceStepInError}
          onDataSpaceChange={setSelectedDataSpace}
          selectedDataSpace={selectedDataSpace}
        />
      )
    },
    {
      label: t('stepper:dataset-deposit:steps:file-selection:title'),
      content: <FileSelectionStep />
    },
    {
      label: t('stepper:dataset-deposit:steps:metadata:title'),
      content: (
        <MetadataStep hasError={isMetadataStepInError} metadata={metadata} onChange={setMetadata} />
      ),
      onValidate: checkMetadata
    },
    {
      label: t('stepper:dataset-deposit:steps:dataset-upload:title'),
      content: <DatasetUploadStep metadata={metadata} />
    }
  ]

  return <DataSetStepper steps={steps} />
}
