import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const GuestContext = createContext(null);

export const GuestProvider = ({ children }) => {
  const [guestData, setGuestData] = useState({});

  useEffect(() => {
    // Clean up any legacy persisted guest data so reload/exit always clears state
    try {
      localStorage.removeItem('everday_guest_data');
      sessionStorage.removeItem('everday_guest_data');
    } catch (err) {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      guestData,
      setGuestData,
    }),
    [guestData]
  );

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
};

export const useGuest = () => useContext(GuestContext);
