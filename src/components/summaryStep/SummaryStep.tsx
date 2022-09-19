import { Typography, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse, DeepReadonly } from '@okp4/ui'
import type { Metadata } from '../metadataStep/MetadataStep'

type SummaryStepProps = {
  readonly metadata?: Metadata
}

export const SummaryStep = ({ metadata }: DeepReadonly<SummaryStepProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const SummaryStepField = ({
    label,
    value
  }: DeepReadonly<{
    label: string
    value: string | undefined
  }>): JSX.Element => (
    <div className="okp4-summary-step-field">
      <Typography fontSize="small" fontWeight="bold">
        {t(`stepper:dataset-deposit:steps:metadata:form:${label}`)}
      </Typography>
      <Typography fontSize="small">{value}</Typography>
    </div>
  )

  return (
    <div className="okp4-summary-step-main">
      <div className="okp4-dataspace-step-description">
        <Typography fontSize="small">
          {t('stepper:dataset-deposit:steps:summary:description')}
        </Typography>
      </div>
      <SummaryStepField label="title" value={metadata?.title} />
      <SummaryStepField label="author" value={metadata?.author} />
      <SummaryStepField label="creator" value={metadata?.creator} />
      <SummaryStepField label="description" value={metadata?.description} />
      <SummaryStepField label="category" value={`${metadata?.category}`} />
      <SummaryStepField label="spatial-coverage" value={`${metadata?.spatialCoverage}`} />
      <SummaryStepField label="licence" value={`${metadata?.licence}`} />
    </div>
  )
}
