import React from "react";
import "./recentActivity.css";
import { BsCalendarWeek } from "react-icons/bs";

export default function recentActivity(props) {
  return (
    <div className="recent-activity">
      <div className="recent-activity-top">
        <div className="recent-activity-icon-container">{props.icon}</div>
        <p>
          {props.author} posted {props.title}
        </p>
      </div>
      <p className="recent-activity-date">
        <BsCalendarWeek />
        {props.date} - {props.time}
      </p>
    </div>
  );
}
