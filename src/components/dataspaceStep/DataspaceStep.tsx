import { Select, Typography, useTranslation } from '@okp4/ui'
import type { SelectOption, SelectValue, UseState, UseTranslationResponse } from '@okp4/ui'
import { useCallback, useMemo, useState } from 'react'

type DataspaceStepProps = {
  readonly hasError: boolean
  readonly selectedDataspace: SelectValue
  readonly onChange: (selectedDataspace: SelectValue) => void
}

// eslint-disable-next-line max-lines-per-function
export const DataspaceStep = ({
  onChange,
  hasError,
  selectedDataspace
}: DataspaceStepProps): JSX.Element => {
  const [dataspace, setDataspace]: UseState<SelectValue> = useState<SelectValue>(selectedDataspace)
  const { t }: UseTranslationResponse = useTranslation()

  const isInvalidStep = useMemo(() => hasError && !dataspace, [dataspace, hasError])

  const options: SelectOption[] = useMemo(
    () => [
      {
        label: 'Rhizome',
        value: 'Rhizome',
        group: t('stepper:dataset-deposit:steps:dataspace:public')
      },
      {
        label: 'Know Universe',
        value: 'Know',
        group: t('stepper:dataset-deposit:steps:dataspace:public')
      }
    ],
    [t]
  )

  const handleDataspaceSelection = useCallback(
    (value: SelectValue): void => {
      setDataspace(value)
      onChange(value)
    },
    [onChange, setDataspace]
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
          onChange={handleDataspaceSelection}
          options={options}
          placeholder={t('stepper:dataset-deposit:steps:dataspace:title')}
          value={dataspace}
        />
      </div>
    </div>
  )
}
