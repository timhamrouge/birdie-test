// would normally separate this out into sub-directories/files
// but that would be overkill for this

const pathBase = `${process.env.REACT_APP_API_URL}`

console.log(pathBase)

export const careRecipientsPath = `${pathBase}/care-recipients`;

export const caregiversPath = `${pathBase}/caregivers`;

export const eventsPath = (careRecipientId : string) => 
  `${pathBase}/events/${careRecipientId}/vists`