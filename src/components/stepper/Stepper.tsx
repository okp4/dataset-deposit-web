import { Stepper as DataSetStepper, useTranslation } from '@okp4/ui'
import type { SelectValue, Step, UseState, UseTranslationResponse } from '@okp4/ui'
import { DataSpaceStep } from '../dataSpaceStep/DataSpaceStep'
import { useState } from 'react'

export const Stepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const [selectedDataSpace, setSelectedDataSpace]: UseState<SelectValue> = useState<SelectValue>('')
  const [dataSpaceStepError, setDataSpaceStepError]: UseState<boolean> = useState<boolean>(false)

  const checkDataSpaceSelection = (): boolean => {
    setDataSpaceStepError(!selectedDataSpace)
    return !!selectedDataSpace
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
      status: 'uncompleted'
    },
    {
      label: t('stepper:dataset-deposit:steps:metadata:title'),
      status: 'disabled'
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
