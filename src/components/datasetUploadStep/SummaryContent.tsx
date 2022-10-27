import { getFiles, List, ListItem, Typography, useFileSelector, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse, DeepReadonly, FileDescriptor } from '@okp4/ui'
import type { Metadata } from '../metadataStep/MetadataStep'
import { useEffect } from 'react'

type SummaryContentProps = {
  readonly metadata: Metadata
}

export const SummaryContent = ({ metadata }: DeepReadonly<SummaryContentProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const fileList: FileDescriptor[] = useFileSelector(getFiles)

  const SummaryField = ({
    label,
    value
  }: DeepReadonly<{
    label: string
    value: string
  }>): JSX.Element => (
    <div className="okp4-dataset-upload-step-summary-field">
      <Typography fontSize="small" fontWeight="bold">
        {t(`stepper:dataset-deposit:steps:metadata:form:${label}`)}
      </Typography>
      <Typography fontSize="small">{value}</Typography>
    </div>
  )

  const FileItem = ({ id, name }: FileDescriptor): JSX.Element => <ListItem key={id} title={name} />

  const element = document.querySelector('.okp4-dataset-upload-step-main')
  useEffect(() => {
    element?.scrollIntoView({
      behavior: 'auto',
      block: 'start'
    })
  }, [element])

  return (
    <div className="okp4-dataset-upload-step-main">
      <div className="okp4-dataspace-step-description">
        <Typography fontSize="small">
          {t('stepper:dataset-deposit:steps:dataset-upload:description')}
        </Typography>
      </div>
      <SummaryField label="title" value={metadata.title} />
      <SummaryField label="author" value={metadata.author} />
      <SummaryField label="creator" value={metadata.creator} />
      <SummaryField label="description" value={metadata.description} />
      <SummaryField label="category" value={`${metadata.category}`} />
      <SummaryField label="spatial-coverage" value={`${metadata.spatialCoverage}`} />
      <SummaryField label="licence" value={`${metadata.licence}`} />
      <List>{fileList.reverse().map((file: FileDescriptor) => FileItem(file))}</List>
    </div>
  )
}
