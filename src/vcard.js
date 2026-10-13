import { person, company } from './data.js'

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;')

export function buildVCard() {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(person.lastName)};${esc(person.firstName)};;;`,
    `FN:${esc(person.fullName)}`,
    `ORG:${esc(company.name)}`,
    `TITLE:${esc(person.title)}`,
    `TEL;TYPE=CELL,VOICE:${person.phone}`,
    `TEL;TYPE=WORK,VOICE:${company.phone}`,
    `EMAIL;TYPE=INTERNET,HOME:${person.email}`,
    `EMAIL;TYPE=INTERNET,WORK:${company.email}`,
    `URL;TYPE=WORK:${company.website}`,
    `URL;TYPE=HOME:${person.personalSite}`,
    `URL:${person.linkedin}`,
    `URL:${person.github}`,
    `ADR;TYPE=WORK:;;${esc('Hopes')};Coimbatore;Tamil Nadu;;India`,
    `NOTE:${esc('Co-Founder & Developer at Arcnio - AI, Robotics, Software, Apps & Cybersecurity.')}`,
    'END:VCARD',
    '',
  ].join('\r\n')
}

const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

/**
 * One tap → the phone's own "Add contact" screen.
 * - iPhone/iPad: opens the .vcf directly, Safari shows "Add to Contacts".
 * - Android/desktop: downloads the .vcf; tapping the download opens Contacts.
 * (Browsers cannot silently write to the address book — this is the closest allowed.)
 */
export function saveContact() {
  if (isIOS()) {
    window.location.href = `${import.meta.env.BASE_URL}athithyan.vcf`
    return
  }
  const blob = new Blob([buildVCard()], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Athithyan-P-Arcnio.vcf'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 5000)
}
