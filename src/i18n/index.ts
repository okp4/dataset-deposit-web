import footer_en from './footer_en.json'
import footer_fr from './footer_fr.json'
import stepper_en from './stepper_en.json'
import stepper_fr from './stepper_fr.json'

export const translationsToLoad = [
  { lng: 'en', namespace: 'footer', resource: footer_en },
  { lng: 'fr', namespace: 'footer', resource: footer_fr },
  { lng: 'en', namespace: 'stepper', resource: stepper_en },
  { lng: 'fr', namespace: 'stepper', resource: stepper_fr }
]
