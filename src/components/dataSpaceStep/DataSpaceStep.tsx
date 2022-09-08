import { Select, Typography, useTranslation } from '@okp4/ui'
import type { SelectOption, SelectValue, UseState, UseTranslationResponse } from '@okp4/ui'
import { useCallback, useMemo, useState } from 'react'

type DataSpaceStepProps = {
  readonly hasError: boolean
  readonly selectedDataSpace: SelectValue
  readonly onDataSpaceChange: (selectedDataSpace: SelectValue) => void
}

// eslint-disable-next-line max-lines-per-function
export const DataSpaceStep = ({
  onDataSpaceChange,
  hasError,
  selectedDataSpace
}: DataSpaceStepProps): JSX.Element => {
  const [dataSpace, setDataSpace]: UseState<SelectValue> = useState<SelectValue>(selectedDataSpace)
  const { t }: UseTranslationResponse = useTranslation()

  const isInvalidStep = hasError && !dataSpace
  const options: SelectOption[] = useMemo(
    () => [
      {
        label: 'Rhizome',
        value: 'Rhizome',
        group: t('stepper:dataset-deposit:steps:dataspace:public')
      }
    ],
    [t]
  )

  const handleDataSpaceSelection = useCallback(
    (value: SelectValue): void => {
      setDataSpace(value)
      onDataSpaceChange(value)
    },
    [onDataSpaceChange, setDataSpace]
  )

  return (
    <div className="okp4-dataspace-step-main">
      <Typography as="div" fontSize="small">
        <div className="okp4-dataspace-step-description">
          {t('stepper:dataset-deposit:steps:dataspace:description')}
        </div>
      </Typography>
      <div className="okp4-dataspace-select-container">
        <Select
          fullWidth
          hasError={isInvalidStep}
          helperText={
            isInvalidStep ? t('stepper:dataset-deposit:steps:dataspace:not-selected') : ''
          }
          onChange={handleDataSpaceSelection}
          options={options}
          placeholder={t('stepper:dataset-deposit:steps:dataspace:title')}
          value={dataSpace}
        />
      </div>
    </div>
  )
}
