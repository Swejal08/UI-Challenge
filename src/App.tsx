import { useState } from "react";
import "./App.css";
import ProfileImg from "./assets/senjogahara.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <>
      <div className="background">
        <div className="main-container">
          <div className="main-box">
            <div className="left-box">
              <div className="profile-container">
                <img src={ProfileImg} alt="Profile" className="profile-img" />
                <div className="profile-text">
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#2b99b7",
                    }}
                  >
                    Swejal Shrestha
                  </h4>
                  <h6>FullStack Dev</h6>
                </div>
              </div>
              <div className="meeting-container">
                <div>
                  <h6 style={{ fontWeight: "bold", color: "#2b99b7" }}>
                    9:00 AM
                  </h6>
                  <h6>Meeting with Shishir</h6>
                </div>
                <div>
                  <h6 style={{ fontWeight: "bold", color: "#2b99b7" }}>
                    11:00 AM
                  </h6>
                  <h6>Meeting with Sohail</h6>
                </div>
              </div>
              <FontAwesomeIcon icon={faCog} className="settings-icon" />
              <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            </div>
            <div className="middle-box">
              <Calender />
            </div>
            <div className="right-box">
              <YearPicker />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

export const YearPicker = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const maxYearsToShow = 5;
  const startPage = Math.max(selectedYear - Math.floor(maxYearsToShow / 2), 1);
  const endPage = startPage + 5 - 1;

  const years = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleYearChange = (increment: number) => {
    setSelectedYear((prevYear) => prevYear + increment);
  };

  return (
    <div className="year-picker">
      <FontAwesomeIcon
        onClick={() => handleYearChange(-1)}
        icon={faChevronUp}
      />
      <div className="year-lists">
        {years.map((year) => (
          <li
            style={{
              listStyle: "none",
              cursor: "pointer",
            }}
            key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? "year-picker-active" : ""}
          >
            {year}
          </li>
        ))}
      </div>
      <FontAwesomeIcon
        onClick={() => handleYearChange(1)}
        icon={faChevronDown}
      />
    </div>
  );
};

enum WEEKDAYS {
  SUNDAY = "SUN",
  MONDAY = "MON",
  TUESDAY = "TUE",
  WEDNESDAY = "WED",
  THURSDAY = "THU",
  FRIDAY = "FRI",
  SATURDAY = "SAT",
}

export const Calender = () => {
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEV",
  ];

  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [monthIndex, setMonthIndex] = useState(0);

  const [dayNumber, setDayNumber] = useState(1);

  const prevMonth = () => {
    setMonthIndex((prevIndex) =>
      prevIndex === 0 ? MONTHS.length - 1 : prevIndex - 1
    );
  };

  const nextMonth = () => {
    setMonthIndex((prevIndex) =>
      prevIndex === MONTHS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderDayNumbers = (day: WEEKDAYS) => {
    const dayNumberMap = {
      [WEEKDAYS.SUNDAY]: [1, 8, 15, 22, 29],
      [WEEKDAYS.MONDAY]: [2, 8, 16, 23, 30],
      [WEEKDAYS.TUESDAY]: [3, 9, 17, 24],
      [WEEKDAYS.WEDNESDAY]: [4, 10, 18, 25],
      [WEEKDAYS.THURSDAY]: [5, 11, 19, 26],
      [WEEKDAYS.FRIDAY]: [6, 12, 20, 27],
      [WEEKDAYS.SATURDAY]: [7, 13, 21, 28],
    };

    const dayNumbers = dayNumberMap[day];

    return dayNumbers.map((dayNo: number) => (
      <div
        className={dayNumber === dayNo ? "day-numbers-active" : "day-numbers"}
        key={`${day}-${dayNo}`}
        onClick={() => setDayNumber(dayNo)}
      >
        <h4>{dayNo}</h4>
      </div>
    ));
  };

  return (
    <div className="calender">
      <div className="calender-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <FontAwesomeIcon
            onClick={prevMonth}
            icon={faArrowLeft}
            style={{ cursor: "pointer" }}
          />
          <h6>
            {monthIndex === 0
              ? MONTHS[MONTHS.length - 1]
              : MONTHS[monthIndex - 1]}
          </h6>
        </div>
        <h1>{MONTHS[monthIndex]}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <h6>
            {monthIndex === MONTHS.length - 1
              ? MONTHS[0]
              : MONTHS[monthIndex + 1]}
          </h6>
          <FontAwesomeIcon
            onClick={nextMonth}
            icon={faArrowRight}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="calender-weekdays">
        {DAYS.map((day) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            key={day}
          >
            <h4 style={{ marginBottom: "20px" }}>{day}</h4>
            {renderDayNumbers(day as WEEKDAYS)}
          </div>
        ))}
      </div>
    </div>
  );
};
