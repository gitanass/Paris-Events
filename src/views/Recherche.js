import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./Event-Card/EventCard";

const Recherche = () => {
  const [eventList, setEventList] = useState([]);
  const [searchTextInfo, setSearchText] = useState("");

  useEffect(() => {
    if (searchTextInfo !== "") {
      getData(searchTextInfo);
    }
  }, []);

  const getData = (searchInfo) => {
    const url =
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/?search=" +
      searchInfo +
      "+&sort=title&rows=15";
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.records);
        setEventList(res.data.records);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    const searchText = event.currentTarget.value;
    setSearchText(searchText);
    // console.log(searchText);
    getData(searchText);
  };

  return (
    <>
      <div className="favourite-title">
        <h1 className='title-search'>
          Liste de futurs événements à Paris
          <div className="trait"></div>
        </h1>
        <p className='searching-events'>Chercher en direct les prochains événements Parisiens</p>
        <div className="trait-prime"></div>
      </div>
      <div className="cap-In-put">
        <input className="In-put" onChange={handleInputChange}></input>
        <button className='search-btn' onClick={() => getData(searchTextInfo)}><i class="fas fa-search"></i></button>
      </div>
      <div>
        {eventList.length > 0 &&
          eventList.map((x, index) => (
            <EventCard
              key={x.id || index.toString()}
              eventInfo={x.record}
              onSaveClick={() => {}}
            />
          ))}
        {eventList.length === 0 && (
          <p className='no-data-found'>Aucun résultat pour cette recherche …</p>
        )}
      </div>
    </>
  );
};

export default Recherche;
