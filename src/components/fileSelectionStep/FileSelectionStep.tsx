import { FilePicker, Typography, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'

export const FileSelectionStep = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-file-selection-step-main">
      <Typography fontSize="small">
        {t('stepper:dataset-deposit:steps:file-selection:description')}
      </Typography>
      <FilePicker
        acceptedFormats={['.csv', '.xls', '.xlsx']}
        description={
          <Typography fontSize="x-small">
            {t('stepper:dataset-deposit:steps:file-selection:file-picker:description')}
          </Typography>
        }
        label={t('stepper:dataset-deposit:steps:file-selection:file-picker:label')}
        showClearAll
      />
    </div>
  )
}
