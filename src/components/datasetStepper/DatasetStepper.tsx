import { Stepper, useTranslation } from '@okp4/ui'
import type { Step, UseTranslationResponse } from '@okp4/ui'

export const DatasetStepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const steps: Step[] = [
    {
      label: t('stepper:upload'),
      status: 'active'
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

  return <Stepper steps={steps} />
}
