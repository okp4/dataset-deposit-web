import { Select, Typography, useTranslation } from '@okp4/ui'
import type { SelectOption, SelectValue, UseState, UseTranslationResponse } from '@okp4/ui'
import { useCallback, useState } from 'react'

type DataSpaceStepProps = {
  readonly hasError: boolean
  readonly selectedDataSpace: SelectValue
  readonly onDataSpaceChange: (selectedDataSpace: SelectValue) => void
}

export const DataSpaceStep = ({
  onDataSpaceChange,
  hasError,
  selectedDataSpace
}: DataSpaceStepProps): JSX.Element => {
  const [dataSpace, setDataSpace]: UseState<SelectValue> = useState<SelectValue>(selectedDataSpace)
  const { t }: UseTranslationResponse = useTranslation()

  const isInvalidStep = hasError && !dataSpace
  const options: SelectOption[] = [
    { label: 'Rhizome', value: 'Rhizome', group: t('stepper:dataspace:public') }
  ]

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
        <div className="okp4-dataspace-step-description">{t('stepper:dataspace:description')}</div>
      </Typography>
      <div className="okp4-dataspace-select-container">
        <Select
          fullWidth
          hasError={isInvalidStep}
          helperText={isInvalidStep ? t('stepper:dataspace:not-selected') : ''}
          onChange={handleDataSpaceSelection}
          options={options}
          placeholder={t('stepper:dataspace:title')}
          value={dataSpace}
        />
      </div>
    </div>
  )
}
