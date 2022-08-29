import { Stepper, useTranslation } from '@okp4/ui'
import type { Step, UseTranslationResponse } from '@okp4/ui'

export const DatasetStepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation('stepper')

  const steps: Step[] = [
    {
      label: t('upload'),
      status: 'active'
    },
    {
      label: t('metadata'),
      status: 'disabled'
    },
    {
      label: t('summary'),
      status: 'disabled'
    },
    {
      label: t('confirmation'),
      status: 'disabled'
    }
  ]

  return <Stepper steps={steps} />
}
