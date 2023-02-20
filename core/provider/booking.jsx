import React from "react";

const BookingContext = React.createContext({});

export function BookingProvider({ children }) {
  const [tankType, setTankType] = React.useState(0);
  const [urlToken, setUrlToken] = React.useState("");
  const [bathroomCaverage, setBathroomCoverage] = React.useState(4);
  const [powerType, setPowerType] = React.useState("gas");

  function setTypeformData(tUrlToken = "", tBathroomCoverage = 4, tPowerType = "gas") {
    setUrlToken(tUrlToken);
    setBathroomCoverage(tBathroomCoverage);
    setPowerType(tPowerType);
  }

  const memoedValue = React.useMemo(
    () => ({
      tankType,
      setTankType,
      urlToken,
      bathroomCaverage,
      powerType,
      setTypeformData
    }),
    [tankType, urlToken, bathroomCaverage, powerType]
  );

  return (
    <BookingContext.Provider value={memoedValue}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return React.useContext(BookingContext);
}
