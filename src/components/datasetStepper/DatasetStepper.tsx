import { Stepper, Typography } from '@okp4/ui'
import type { Step } from '@okp4/ui'

const steps: Step[] = [
  {
    label: 'Upload your files',
    status: 'active',
    content: (
      <div className="okp4-dataset-upload-step">
        <Typography as="div" fontFamily="brand" fontSize="small" fontWeight="xlight">
          This step will contain the input file and corresponding uploaded files list.
        </Typography>
      </div>
    )
  },
  {
    label: 'Meta data',
    status: 'disabled'
  },
  {
    label: 'Summary',
    status: 'disabled'
  },
  {
    label: 'Confirmation',
    status: 'disabled'
  }
]

export const DatasetStepper = (): JSX.Element => <Stepper steps={steps} />
