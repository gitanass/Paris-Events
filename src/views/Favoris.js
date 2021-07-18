import React, { useState, useEffect } from "react";
import EventCard from "./Event-Card/EventCard";
const Favoris = () => {
  const [favouritiesList, setFavouritiesList] = useState([]);
  useEffect(() => {
    getSavedItemsFromLocalStorage();
  }, []);

  const getSavedItemsFromLocalStorage = () => {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    setFavouritiesList(values);
    console.log(values);
  };
  return (
    <div className="favourite-title">
      <h1>
        Événements sauvegardés
        <div className="trait"></div>
      </h1>
      <div className="trait-prime"></div>
      {favouritiesList.map((x, index) => {
        return (
          <EventCard
            key={x.id}
            eventInfo={x}
            onSaveClick={() => getSavedItemsFromLocalStorage()}
          />
        );
      })}
      {favouritiesList.length === 0 && (
          <p className={"no-data-found"}>Aucun résultat pour cette recherche …</p>
        )}
    </div>
  );
};

export default Favoris;
