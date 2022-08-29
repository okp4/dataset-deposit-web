import {
  Footer,
  Header,
  loadTranslations,
  Typography,
  useTheme,
  useTranslation,
  Logo
} from '@okp4/ui'
import type { ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import lightCosmos from '@okp4/ui/lib/assets/images/cosmos-clear.png'
import darkCosmos from '@okp4/ui/lib/assets/images/cosmos-dark.png'
import { translationsToLoad } from '../../i18n/index'
import { Stepper } from '../stepper/Stepper'

type FooterLinkProps = {
  readonly linkText: string
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

const Okp4Link = ({ linkText }: FooterLinkProps): JSX.Element => {
  return (
    <Typography as="p" color="highlighted-text" fontSize="x-small" fontWeight="xlight" noWrap>
      {`${linkText} `}
      <Typography color="highlighted-text" fontSize="x-small" fontWeight="bold">
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
  loadTranslations(translationsToLoad)
  const footerLinkText = t('footer:brand-link')

  return (
    <div
      className="okp4-dataset-deposit-content"
      style={{ backgroundImage: `url(${themedImage})` }}
    >
      <Header firstElement={<Logo size="small" />} />
      <div className="okp4-dataset-stepper-container">
        <div className="okp4-dataset-stepper-main">
          <Typography as="h1" fontWeight="bold">
            {t('stepper:dataset-deposit')}
          </Typography>
          <div className="okp4-dataset-stepper-description">
            <Typography as="h2" fontSize="small">
              {t('stepper:dataset-description')}
            </Typography>
          </div>
          <Stepper />
        </div>
      </div>
      <Footer languages={languages} lastElement={<Okp4Link linkText={footerLinkText} />} />
    </div>
  )
}

export default Content
