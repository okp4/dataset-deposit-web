import type { DeepReadonly } from '@okp4/ui'
import type { Metadata } from '../metadataStep/MetadataStep'
import { SummaryContent } from './SummaryContent'
import { UploadContent } from './UploadContent'
import { SuccessOrErrorContent } from './SuccessOrErrorContent'

export type DatasetUploadStepContentType = 'summary' | 'upload' | 'success' | 'error'

type DatasetUploadProps = {
  readonly contentType: DatasetUploadStepContentType
  readonly metadata?: Metadata
}

export const DatasetUploadStep = ({
  contentType,
  metadata
}: DeepReadonly<DatasetUploadProps>): JSX.Element => {
  return contentType === 'summary' ? (
    <SummaryContent metadata={metadata} />
  ) : contentType === 'upload' ? (
    <UploadContent />
  ) : (
    <SuccessOrErrorContent contentType={contentType} />
  )
}
