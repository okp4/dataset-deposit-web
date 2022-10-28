import type { Breakpoints, UseTranslationResponse } from '@okp4/ui'
import {
  FilePicker,
  getFiles,
  Typography,
  useBreakpoint,
  useFileSelector,
  useTranslation
} from '@okp4/ui'
import { useEffect, useMemo, useRef } from 'react'

const AcceptedFormats = ['.csv', '.xls', '.xlsx']

export const FileSelectionStep = (): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const { isXSmall, isSmall }: Breakpoints = useBreakpoint()

  const isMobile = useMemo(() => isXSmall || isSmall, [isXSmall, isSmall])

  const fileLength = useFileSelector(getFiles).length

  const element = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fileLength &&
      element.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
  }, [fileLength, element])

  return (
    <div className="okp4-file-selection-step-main">
      <Typography fontSize="small">
        {t('stepper:dataset-deposit:steps:file-selection:description')}
      </Typography>
      <div className="okp4-file-selection-step-file-picker" ref={element}>
        <FilePicker
          acceptedFormats={AcceptedFormats}
          description={
            <Typography fontSize="x-small">
              {t(
                `stepper:dataset-deposit:steps:file-selection:file-picker:${
                  isMobile ? 'mobile:' : ''
                }description`
              )}
            </Typography>
          }
          label={t(
            `stepper:dataset-deposit:steps:file-selection:file-picker:${
              isMobile ? 'mobile:' : ''
            }label`
          )}
          showClearAll
        />
      </div>
    </div>
  )
}
