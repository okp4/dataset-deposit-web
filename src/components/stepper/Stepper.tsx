import { Stepper as DataSetStepper, truthy, useTranslation } from '@okp4/ui'
import type { SelectValue, Step, UseState, UseTranslationResponse } from '@okp4/ui'
import { useState } from 'react'
import { DataSpaceStep } from '../dataSpaceStep/DataSpaceStep'
import { UploadStep } from '../uploadStep/UploadStep'
import type { Metadata } from '../metadataStep/MetadataStep'
import { MetadataStep } from '../metadataStep/MetadataStep'

// eslint-disable-next-line max-lines-per-function
export const Stepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [selectedDataSpace, setSelectedDataSpace]: UseState<SelectValue> = useState<SelectValue>('')
  const [dataSpaceStepError, setDataSpaceStepError]: UseState<boolean> = useState<boolean>(false)
  const [metadata, setMetadata]: UseState<Metadata | undefined> = useState<Metadata | undefined>(
    undefined
  )
  const [metadataStepError, setMetadataStepError]: UseState<boolean> = useState<boolean>(false)

  const checkDataSpaceSelection = (): boolean => {
    setDataSpaceStepError(!selectedDataSpace)
    return !!selectedDataSpace
  }

  const checkMetadata = (): boolean => {
    const mandatoryMetadata =
      !!metadata &&
      truthy(metadata.datasetTitle) &&
      truthy(metadata.author) &&
      truthy(metadata.creator) &&
      truthy(metadata.category) &&
      truthy(metadata.licence)
    setMetadataStepError(!mandatoryMetadata)
    return mandatoryMetadata
  }

  const steps: Step[] = [
    {
      label: t('stepper:dataset-deposit:steps:dataspace:title'),
      onValidate: checkDataSpaceSelection,
      status: 'active',
      content: (
        <DataSpaceStep
          hasError={dataSpaceStepError}
          onDataSpaceChange={setSelectedDataSpace}
          selectedDataSpace={selectedDataSpace}
        />
      )
    },
    {
      label: t('stepper:dataset-deposit:steps:upload:title'),
      content: <UploadStep />
    },
    {
      label: t('stepper:dataset-deposit:steps:metadata:title'),
      content: (
        <MetadataStep hasError={metadataStepError} metadata={metadata} onChange={setMetadata} />
      ),
      onValidate: checkMetadata
    },
    {
      label: t('stepper:dataset-deposit:steps:summary:title'),
      status: 'disabled'
    },
    {
      label: t('stepper:dataset-deposit:steps:confirmation:title'),
      status: 'disabled'
    }
  ]

  return <DataSetStepper steps={steps} />
}
