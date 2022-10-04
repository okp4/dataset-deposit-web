import { Typography, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse, DeepReadonly } from '@okp4/ui'
import type { Metadata } from '../metadataStep/MetadataStep'

type SummaryContentProps = {
  readonly metadata?: Metadata
}

export const SummaryContent = ({ metadata }: DeepReadonly<SummaryContentProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const SummaryField = ({
    label,
    value
  }: DeepReadonly<{
    label: string
    value: string | undefined
  }>): JSX.Element => (
    <div className="okp4-dataset-upload-step-summary-field">
      <Typography fontSize="small" fontWeight="bold">
        {t(`stepper:dataset-deposit:steps:metadata:form:${label}`)}
      </Typography>
      <Typography fontSize="small">{value}</Typography>
    </div>
  )

  return (
    <div className="okp4-dataset-upload-step-main">
      <div className="okp4-dataspace-step-description">
        <Typography fontSize="small">
          {t('stepper:dataset-deposit:steps:file-selection:description')}
        </Typography>
      </div>
      <SummaryField label="title" value={metadata?.title} />
      <SummaryField label="author" value={metadata?.author} />
      <SummaryField label="creator" value={metadata?.creator} />
      <SummaryField label="description" value={metadata?.description} />
      <SummaryField label="category" value={`${metadata?.category}`} />
      <SummaryField label="spatial-coverage" value={`${metadata?.spatialCoverage}`} />
      <SummaryField label="licence" value={`${metadata?.licence}`} />
    </div>
  )
}
