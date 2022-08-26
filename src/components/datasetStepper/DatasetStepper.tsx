import { Stepper, useTranslation } from '@okp4/ui'
import type { Step, UseTranslationResponse } from '@okp4/ui'

const makeSteps = (
  uploadTitle: string,
  metadataTitle: string,
  summaryTitle: string,
  confirmationTitle: string
): Step[] => [
  {
    label: uploadTitle,
    status: 'active'
  },
  {
    label: metadataTitle,
    status: 'disabled'
  },
  {
    label: summaryTitle,
    status: 'disabled'
  },
  {
    label: confirmationTitle,
    status: 'disabled'
  }
]

export const DatasetStepper = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation('stepper')
  const uploadTitle = t('upload')
  const metadataTitle = t('metadata')
  const summaryTitle = t('summary')
  const confirmationTitle = t('confirmation')
  const steps = makeSteps(uploadTitle, metadataTitle, summaryTitle, confirmationTitle)

  return <Stepper steps={steps} />
}
