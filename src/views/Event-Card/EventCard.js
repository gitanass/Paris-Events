import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EventCard = (props) => {
  const history = useHistory();
  const [isEventSaved, setIsEventSaved] = useState(false);

  useEffect(() => {
    checkIfEventIsSaved(props.eventInfo);
  }, []);

  const checkIfEventIsSaved = (eventInfo) => {
    const isEventExists = localStorage.getItem(eventInfo.id);
    setIsEventSaved(isEventExists !== null);
  };

  const saveEvent = (e) => {
    e.stopPropagation();
    const isEventExists = localStorage.getItem(props.eventInfo.id);
    if (isEventExists) {
      localStorage.removeItem(props.eventInfo.id);
      setIsEventSaved(false);
    } else {
      setIsEventSaved(true);
      localStorage.setItem(props.eventInfo.id, JSON.stringify(props.eventInfo));
    }
    props.onSaveClick && props.onSaveClick();
  };
  return (
    <div className="card event-card ">
      <div
        className="card-main"
        onClick={() => history.push("/details/" + props.eventInfo.id)}
      >
        <div className="cap-card-main">
          <img
            className="img-card"
            src={props.eventInfo.fields.cover_url}
            alt="card-img"
            width="100%"
            height="100%"
          />
        </div>

        <div className="cap-ect">
          <p className="card-title">{props.eventInfo.fields.title}</p>
          <p className="card-date">
            {new Date(props.eventInfo.fields.date_start).toLocaleDateString(
              "en-US"
            )}{" "}
            ,
            {new Date(props.eventInfo.fields.date_start).toLocaleTimeString(
              "en-US"
            )}
          </p>
          <p
            className="card-description"
            dangerouslySetInnerHTML={{
              __html: props.eventInfo.fields.description,
            }}
          >
          </p>
          <div>
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
  );
};

export default EventCard;
