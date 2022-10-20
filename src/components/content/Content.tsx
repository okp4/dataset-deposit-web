import { Footer, Header, Typography, useTheme, useTranslation, Logo } from '@okp4/ui'
import type { ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import lightCosmos from '@okp4/ui/lib/assets/images/cosmos-clear.png'
import darkCosmos from '@okp4/ui/lib/assets/images/cosmos-dark.png'
import { Stepper } from '../stepper/Stepper'
import '../../i18n/index'

type FooterLinkProps = {
  readonly label: string
}

const languages = [
  {
    name: 'English',
    lng: 'en'
  },
  {
    name: 'Français',
    lng: 'fr'
  }
]

const Okp4Link = ({ label }: FooterLinkProps): JSX.Element => {
  return (
    <Typography as="p" color="invariant-text" fontSize="x-small" fontWeight="xlight" noWrap>
      {`${label} `}
      <Typography color="invariant-text" fontSize="x-small" fontWeight="bold">
        <a
          className="okp4-brand-link"
          href="https://okp4.network/"
          rel="author noreferrer"
          target="_blank"
        >
          ØKP4
        </a>
      </Typography>
    </Typography>
  )
}

export const Content = (): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const themedImage = theme === 'light' ? lightCosmos.src : darkCosmos.src
  const footerLabel = t('footer:brand-link')

  return (
    <div
      className="okp4-dataset-deposit-content"
      style={{ backgroundImage: `url(${themedImage})` }}
    >
      <Header firstElement={<Logo size="small" />} />

      <div className="okp4-dataset-stepper-container">
        <div className="okp4-dataset-stepper-main">
          <Typography as="h1" fontWeight="bold">
            {t('stepper:dataset-deposit:title')}
          </Typography>
          <div className="okp4-dataset-stepper-description">
            <Typography as="h2" fontSize="small">
              {t('stepper:dataset-deposit:description')}
            </Typography>
          </div>
          <div className="okp4-stepper-container">
            <Stepper />
          </div>
        </div>
      </div>

      <Footer languages={languages} lastElement={<Okp4Link label={footerLabel} />} />
    </div>
  )
}

export default Content
