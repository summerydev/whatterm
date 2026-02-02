import React, { useState } from "react";

const holidays = [
  "2024/01/01",
  "2024/02/09",
  "2024/02/10",
  "2024/02/12",
  "2024/03/01",
  "2024/05/05",
  "2024/05/06",
  "2024/05/15",
  "2024/06/06",
  "2024/08/15",
  "2024/09/16",
  "2024/09/17",
  "2024/09/18",
  "2024/09/19",
  "2024/09/20",
  "2024/10/01",
  "2024/10/03",
  "2024/10/09",
  "2024/12/25",
  "2024/12/30",
  "2024/12/31",
  "2025/01/01",
  "2025/01/27",
  "2025/01/28",
  "2025/01/29",
  "2025/01/30",
  "2025/03/01",
  "2025/03/03",
  "2025/05/05",
  "2025/05/06",
  "2025/06/03",
  "2025/06/06",
  "2025/08/15",
  "2025/10/03",
  "2025/10/04",
  "2025/10/06",
  "2025/10/07",
  "2025/10/08",
  "2025/10/09",
  "2025/12/25",
  "2026/01/01","2026/01/02","2026/01/03",
  "2026/02/16","2026/02/17","2026/02/18","2026/03/02","2026/05/01","2026/05/02","2026/05/04","2026/05/05","2026/05/25",
];

const clearTime = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
const isSunday = (date) => date.getDay() === 0;

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const calHolidays = (newDate, resultDate) => {
  let holidaysCount = 0;
  for (const holiday of holidays) {
    const holidayDate = clearTime(new Date(holiday));
    if (
      holidayDate >= clearTime(newDate) &&
      holidayDate <= clearTime(resultDate)
    ) {
      holidaysCount++;
    }
  }
  return holidaysCount;
};

const calTerm = (newDate) => {
  let resultDate = addDays(newDate, 84); // 기본 84일 추가
  let holidaysCount = calHolidays(newDate, resultDate);
  resultDate = addDays(resultDate, holidaysCount);

  // 결과가 일요일이라면 1일 추가
  if (isSunday(resultDate)) {
    resultDate = addDays(resultDate, 1);
  }

  // 결과 날짜가 공휴일이라면 1일 추가
  while (
    holidays.some(
      (holiday) =>
        clearTime(new Date(holiday)).getTime() ===
        clearTime(resultDate).getTime()
    )
  ) {
    resultDate = addDays(resultDate, 1);
    // 추가된 날짜가 일요일이면 1일 더 추가
    if (isSunday(resultDate)) {
      resultDate = addDays(resultDate, 1);
    }
  }

  return resultDate;
};

function DateCalculator() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calculatedDate, setCalculatedDate] = useState(calTerm(new Date()));

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) {
      setSelectedDate(newDate);
      setCalculatedDate(calTerm(newDate));
    }
  };

  return (
    <div>
      <h3>Select a date:</h3>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
      <div>
        <p>Term: {calculatedDate.toISOString().split("T")[0]}</p>
      </div>
      <div>
        <h3>Closed</h3>
        <ul>
          {holidays.map((holiday) => {
            return <li key={holiday}>{holiday}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default DateCalculator;
