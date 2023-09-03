import React, { useState, useEffect } from 'react';
import './AttendanceForm.css';

const AttendanceForm = () => {

  const [userID, setUserID] = useState('');
  const [date, setDate] = useState('');
  const [overtime, setOvertime] = useState('');
  const [reportingTime, setReportingTime] = useState('');
  const [lateHours, setLateHours] = useState('');
  const [attendance, setAttendance] = useState('');
  const [userList, setUserList] = useState([]);
  const [salary, setSalary] = useState('');

  useEffect(() => {
    // Fetch the user list from the server
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await fetch('/users');
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.log('Error fetching user list:', error);
    }
  };

  const handleUserIDChange = (event) => {
    setUserID(event.target.value);
    console.log(userID)
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleOvertimeChange = (event) => {
    setOvertime(event.target.value);
  };

  const handleReportingTimeChange = (event) => {
    setReportingTime(event.target.value);
  };

  const handleLateHoursChange = (event) => {
    setLateHours(event.target.value);
  };

  const handleAttendanceChange = (event) => {
    setAttendance(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here
    fetch('/attendanceUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID: userID,
            date: date,
            overtime: overtime,
            rptTime: reportingTime,
            lateHours: lateHours,
            attendance: attendance,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data inserted successfully:', data);
          alert("Data inserted successfully");
          // Handle success or update UI accordingly
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
          alert("Error inserting data")
          // Handle error or display error message
        });
  };

  return (
    <div className="attendance-form-container">
      <h2 className="form-heading">Attendance Form</h2>
      <form className="attendance-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="userID" className="form-label">
            Employee:
          </label>
          <select id="userID" className="form-select" value={userID} onChange={handleUserIDChange} required>
            <option value="">Select User ID</option>
            {userList.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.emp_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input type="date" id="date" className="form-input" value={date} onChange={handleDateChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="overtime" className="form-label">
            Overtime:
          </label>
          <input type="number" id="overtime" className="form-input" value={overtime} onChange={handleOvertimeChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="reportingTime" className="form-label">
            Reporting Time:
          </label>
          <input type="time" id="reportingTime" className="form-input" value={reportingTime} onChange={handleReportingTimeChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="lateHours" className="form-label">
            Late Hours:
          </label>
          <input type="number" id="lateHours" className="form-input" value={lateHours} onChange={handleLateHoursChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="attendance" className="form-label">
            Attendance:
          </label>
          <select id="attendance" className="form-select" value={attendance} onChange={handleAttendanceChange} required>
            <option value="">Select Attendance</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Mark</button>
      </form>
    </div>
  );
};

export default AttendanceForm;
