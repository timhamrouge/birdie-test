import { createContext, useState } from 'react';

// todo - fix this
export const CareRecipientContext = createContext<{
  careRecipient: null | YourValueType;
  setCareRecipient: React.Dispatch<React.SetStateAction<null | YourValueType>>;
}>({
  careRecipient: null,
  setCareRecipient: () => {},
});

interface Props {
  children: any
};

export const CareRecipientProvider = ({ children }: Props) => {
  const [careRecipient , setCareRecipient] = useState(null);

  return (
    <CareRecipientContext.Provider value={{ careRecipient, setCareRecipient }}>
      {children}
    </CareRecipientContext.Provider>
  );
};