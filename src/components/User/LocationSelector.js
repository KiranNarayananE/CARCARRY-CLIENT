import React, { useContext, useState, useEffect } from "react";
import { LocationContext } from "../../Context/locationContext";

const  LocationSelector = () => {
  const [inFocus, setInFocus] = useState("from");
  const { setPickup, setDropoff } = useContext(LocationContext);
  const [suggestions, setSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const [pickUp, setPickUP] = useState();
  const [dropOFF, setDropOFF] = useState();

  useEffect(() => {
    // Get the current location of the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${
          process.env.REACT_APP_MAPBOX_TOKEN
        }`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const currentLocation = data.features[0].place_name;
            setPickUP(currentLocation);
            setPickup(currentLocation);
          });
      });
    }
  }, [setPickup]);

  // * Pickup Suggestions *//
  let bbox = [72.55, 8.15, 78.55, 13.05];
  const handleInput = async (event) => {
    const query = event.target.value;
    if (!query) {
      setSuggestions([]);
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${
      process.env.REACT_APP_MAPBOX_TOKEN
    }&country=IN&region=KA,TN,KL&bbox=${bbox.join(",")}`;
    const response = await fetch(url);
    const data = await response.json();
    setSuggestions(data.features.map((f) => f.place_name));
  };

  const handlePickup = (suggestion) => {
    setPickup(suggestion);
    setPickUP(suggestion);
    setSuggestions([]);
  };

  //* DropOff Suggestions *//
  const handleDrop = async (event) => {
    const query = event.target.value;
    if (!query) {
      setDropSuggestions([]);
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${
      process.env.REACT_APP_MAPBOX_TOKEN
    }&country=IN&region=KA,TN,KL&bbox=${bbox.join(",")}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data,"data")
    setDropSuggestions(data.features.map((f) => f.place_name));
  };

  const handleDropoff = (suggestion) => {
    setDropoff(suggestion);
    setDropOFF(suggestion);
    setDropSuggestions([]);
  };

  const handleSetPickUP = (event) => {
    setPickUP(event.target.value);
  };

  const handleDropOFF = (event) => {
    setDropOFF(event.target.value);
  };

  return (
    <div className="pt-2">
      <div className="w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden  ">
        {inFocus === "from" ? "Where can we pick you up ?" : "Where to ?"}
      </div>
      <div className="flex flex-col md:mb-4 relative">
        <div className={`h-10 mx-4 border-2 bg-#eeeeee flex items-center my-1 py-1 px-2 ${inFocus === "from" && "border-black"}`}>
          <div className="mx-1">
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" />
            </svg>
          </div>
          <input
            className="my-2 rounded-2 p-22 outline-none border-none bg-transparent h-full w-full"
            placeholder="Enter pickup loaction"
            value={pickUp} 
            onChange={handleSetPickUP}
            onFocus={() => setInFocus("from")}
            onInput={handleInput}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll mt-64 rounded shadow-md">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handlePickup(suggestion)} className="cursor-pointer hover:bg-gray-200 p-2 border-b border-gray-400">
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-0 h-[2rem] border-black border absolute z-10 left-[2.3rem] top-[2rem]" />
        <div className={`h-10 mx-4 border-2 bg-#eeeeee flex items-center my-1 py-1 px-2 ${inFocus === "to" && "border-black"}`}>
          <div className="mx-1">
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" />
            </svg>
          </div>
          <input
            className="my-2 rounded-2 p-22 outline-none border-none bg-transparent h-full w-full"
            placeholder="Enter pickup loaction"
            value={dropOFF}
            onChange={handleDropOFF}
            onFocus={() => setInFocus("to")}
            onInput={handleDrop}
          />
          {dropSuggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-400 w-full max-h-48 overflow-y-scroll mt-64 rounded shadow-md">
              {dropSuggestions.map((dropSuggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleDropoff(dropSuggestion)}
                  className="cursor-pointer hover:bg-gray-200 p-2 border-b border-gray-400">
                  {dropSuggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
