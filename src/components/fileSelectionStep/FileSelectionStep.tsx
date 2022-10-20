import { FilePicker, getFiles, Typography, useFileSelector, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'
import { useEffect } from 'react'

export const FileSelectionStep = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  const fileLength = useFileSelector(getFiles).length

  const element = document.querySelector('.okp4-list-main')

  useEffect(() => {
    fileLength &&
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
  }, [fileLength, element])

  return (
    <div className="okp4-file-selection-step-main">
      <Typography fontSize="small">
        {t('stepper:dataset-deposit:steps:file-selection:description')}
      </Typography>
      <div className="okp4-file-selection-step-file-picker">
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
    </div>
  )
}
