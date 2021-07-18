import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Card = () => {
  const history = useHistory();
  const [recordState, setRecord] = useState([]);
  const [closedDayEvent, setClosestDayEvent] = useState({});
  const [isEventSaved, setIsEventSaved] = useState(false);

  useEffect(() => {
    Axios.get(
      "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records"
    ).then((res) => {
      const tab = res.data.records;
      const recordTab = [];
      let closestDayRecord;
      const now = new Date();

      let closest = Infinity;
      tab.forEach(function (tab) {
        const date = new Date(tab.record.fields.date_start);
        if (date >= now && (date < new Date(closest) || date < closest)) {
          closest = tab.record.fields.date_start;
          closestDayRecord = tab.record;
        }
        console.log(closestDayRecord);
        recordTab.push(tab.record);
      });
      setClosestDayEvent(closestDayRecord);
      checkIfEventIsSaved(closestDayRecord);
      //console.log(recordTab);
      setRecord(recordTab);
    });
  }, []);

  const checkIfEventIsSaved = (eventInfo) => {
    const isEventExists = localStorage.getItem(eventInfo.id);
    setIsEventSaved(isEventExists !== null);
  };

  const saveEvent = (e) => {
    e.stopPropagation();
    const isEventExists = localStorage.getItem(closedDayEvent.id);
    if (isEventExists) {
      localStorage.removeItem(closedDayEvent.id);
      setIsEventSaved(false);
    } else {
      setIsEventSaved(true);
      localStorage.setItem(closedDayEvent.id, JSON.stringify(closedDayEvent));
    }
  };

  //console.log(closedDayEvent);

  return (
    <>
      {closedDayEvent.fields !== undefined && (
        <div className="card">
          <div
            className="card-main"
            onClick={() => history.push("/details/" + closedDayEvent.id)}
          >
            <div className="cap-card-main">
              <img
                className="img-card"
                src={closedDayEvent.fields.cover_url}
                alt="card-img"
                width="100%"
                height="100%"
              />
            </div>

            <div className="cap-ect">
              <p className="card-title">{closedDayEvent.fields.title}</p>
              <p className="card-date">
                {new Date(closedDayEvent.fields.date_start).toLocaleDateString(
                  "en-US"
                )}{" "}
                ,
                {new Date(closedDayEvent.fields.date_start).toLocaleTimeString(
                  "en-US"
                )}
              </p>
              <p
                className="card-description"
                dangerouslySetInnerHTML={{
                  __html: closedDayEvent.fields.description,
                }}
              >
              </p>
              <div className='cap-cardsave'>
                <button
                  className="details-rightsection-buttonsave cardsave"
                  onClick={saveEvent}
                >
                  {isEventSaved ? (
                    <i className="fas fa-heart"> </i>
                  ) : (
                    <i id="heart" className="far fa-heart"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
