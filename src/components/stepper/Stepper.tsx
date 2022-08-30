import { Stepper as DatasetStepper, useTranslation } from '@okp4/ui'
import type { Step, UseTranslationResponse } from '@okp4/ui'

export const Stepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const steps: Step[] = [
    {
      label: t('stepper:dataspace'),
      status: 'active'
    },
    {
      label: t('stepper:upload'),
      status: 'disabled'
    },
    {
      label: t('stepper:metadata'),
      status: 'disabled'
    },
    {
      label: t('stepper:summary'),
      status: 'disabled'
    },
    {
      label: t('stepper:confirmation'),
      status: 'disabled'
    }
  ]

  return <DatasetStepper steps={steps} />
}
