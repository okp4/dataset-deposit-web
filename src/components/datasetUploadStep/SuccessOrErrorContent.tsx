import { Typography, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse, DeepReadonly } from '@okp4/ui'
import type { DatasetUploadStepContentType } from './DatasetUploadStep'

type SuccessOrErrorProps = {
  readonly contentType: DatasetUploadStepContentType
}

export const SuccessOrErrorContent = ({
  contentType
}: DeepReadonly<SuccessOrErrorProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-success-error-container">
      <div className="okp4-success-error-content">
        {contentType === 'success' ? (
          <Typography color="success" fontSize="medium" fontWeight="bold">
            {t('stepper:dataset-deposit:steps:dataset-upload:success')}
          </Typography>
        ) : (
          <Typography color="error" fontSize="small" fontWeight="bold">
            {t('stepper:dataset-deposit:steps:dataset-upload:error')}
          </Typography>
        )}
      </div>
    </div>
  )
}
