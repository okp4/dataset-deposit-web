import { FilePicker, Typography, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'

export const UploadStep = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-upload-step-main">
      <FilePicker
        acceptedFormats={['.csv', '.xls', '.xlsx']}
        description={
          <Typography fontSize="x-small">
            {t('stepper:dataset-deposit:steps:upload:file-picker:description')}
          </Typography>
        }
        label={t('stepper:dataset-deposit:steps:upload:file-picker:label')}
      />
    </div>
  )
}
