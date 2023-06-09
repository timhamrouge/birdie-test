// would normally separate this out into sub-directories/files
// but that would be overkill for this

const pathBase = `${process.env.REACT_APP_API_URL}`

export const careRecipientsPath = `${pathBase}/care-recipients`;

export const caregiversPath = `${pathBase}/caregivers`;

export const eventsPath = (careRecipientId : string, pageNumber?: string) => 
  `${pathBase}/events/${careRecipientId}/visits?page=${pageNumber ? pageNumber : '1'}`

export const visitPath = (careRecipientId : string, visitId: string) =>  
(careRecipientId && visitId) ? `${pathBase}/events/${careRecipientId}/visits/${visitId}` : null;