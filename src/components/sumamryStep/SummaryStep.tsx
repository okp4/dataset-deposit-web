import { Typography, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse, DeepReadonly } from '@okp4/ui'
import type { Metadata } from '../metadataStep/MetadataStep'

type SummaryStepProps = {
  readonly metadata?: Metadata
}

// eslint-disable-next-line max-lines-per-function
export const SummaryStep = ({ metadata }: DeepReadonly<SummaryStepProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-summary-step-main">
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.dataset')}
        </Typography>
        <Typography fontSize="small">{metadata?.datasetTitle}</Typography>
      </div>
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.author')}
        </Typography>
        <Typography fontSize="small">{metadata?.author}</Typography>
      </div>
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.creator')}
        </Typography>
        <Typography fontSize="small">{metadata?.creator}</Typography>
      </div>
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.description')}
        </Typography>
        <Typography fontSize="small">{metadata?.description}</Typography>
      </div>
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.category')}
        </Typography>
        <Typography fontSize="small">{metadata?.category}</Typography>
      </div>
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.spatial-coverage')}
        </Typography>
        <Typography fontSize="small">{metadata?.spatialCoverage}</Typography>
      </div>
      <div className="okp4-summary-step-field">
        <Typography fontSize="small" fontWeight="bold">
          {t('stepper:summary.licence')}
        </Typography>
        <Typography fontSize="small">{metadata?.licence}</Typography>
      </div>
    </div>
  )
}
