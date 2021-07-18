import axios from "axios";
import React, { useEffect, useState } from "react";

const DetailsCard = (props) => {
  const [eventInfo, setEventInfo] = useState({});
  const [isEventSaved, setIsEventSaved] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/" +
          props.match?.params?.id
      )
      .then((res) => {
        console.log(res.data.record);
        const isEventExists = localStorage.getItem(res.data?.record?.id);
        setIsEventSaved(isEventExists !== null);
        setEventInfo(res.data?.record);
      });
  }, []);

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const onSave = () => {
    const isEventExists = localStorage.getItem(eventInfo.id);
    if (isEventExists) {
      localStorage.removeItem(eventInfo.id);
      setIsEventSaved(false);
    } else {
      setIsEventSaved(true);
      localStorage.setItem(eventInfo.id, JSON.stringify(eventInfo));
    }
  };

  return (
    <div className='detail-Main'>
      <div>
        <h3>{eventInfo?.fields?.title}</h3>
      </div>
      <div className='details-info'>
        <div className='details-leftsection'>
          <img className='details-leftsection-img' src={eventInfo?.fields?.cover_url} />

          <p className='details-leftsection-desc'
            dangerouslySetInnerHTML={{
              __html: eventInfo?.fields?.description,
            }}
          ></p>
        </div>
        <div className='details-rightsection'>
          <button
            className='details-rightsection-buttonsave'
            onClick={() => {
              onSave();
            }}
          >
            {isEventSaved ? (
              <i className="fas fa-heart"> </i>
            ) : (
              <i id="heart" className="far fa-heart"></i>
            )}
            Save
          </button>
          <div>
            <h3>Dates : </h3>
            <p>{new Date(eventInfo?.fields?.date_start).toDateString()}</p>
            <div>
              <span>
                from {formatAMPM(new Date(eventInfo?.fields?.date_start)) + " "}
              </span>
              <span>
                to {formatAMPM(new Date(eventInfo?.fields?.date_end))}
              </span>
            </div>
            <h3>Price : </h3>
            <p>{eventInfo?.fields?.price_detail}</p>
            <h3>Getting There :</h3>
            <p>
              {eventInfo?.fields?.address_street +
                " " +
                eventInfo?.fields?.address_name +
                " " +
                eventInfo?.fields?.address_city}
            </p>
            <h3>By transport : </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: eventInfo?.fields?.transport,
              }}
            ></p>
            <h2>More informations : </h2>
            <div>
              <span>
                <i className="fas fa-phone"></i>
              </span>
              <a href="">{eventInfo?.fields?.contact_phone}</a>
            </div>
            <div className={"details-info-rightsection-email"}>
              <span>
                <i className="fas fa-envelope"></i>
              </span>
              <a href="">{eventInfo?.fields?.contact_mail}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
