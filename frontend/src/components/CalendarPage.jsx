import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import './Modal.css';
import { Container } from '@mui/material';
import AddReminder from './AddReminder';
import dayjs from 'dayjs';
import axios from 'axios';
import { scheduleNotification } from '../utils/notificationManager';




const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch reminders from the API
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reminders/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const apiEvents = response.data.map((reminder) => ({
          id: reminder.id,
          title: reminder.title,
          start: reminder.remind_time,
          allDay: false,
        }));
        setEvents(apiEvents);
        response.data.forEach((reminder) => {
          scheduleNotification({ title: reminder.title, remind_time: reminder.remind_time });
        });
      } catch (err) {
        console.error('Error fetching reminders:', err);
      }
    };

    fetchReminders();
  }, []);

  const openModal = (date, event = null) => {
    if (event) {
      setSelectedDate(dayjs(event.start).format('YYYY-MM-DD'));
      setReminder(event.title);
      setStartTime(dayjs(event.start));

      setEditMode(true);
      setEditEventId(event.id);
    } else {
      setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
      setReminder('');
      setStartTime(dayjs());

      setEditMode(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setReminder('');
    setStartTime(dayjs());
    setEditMode(false);
    setEditEventId(null);
  };

  const handleAddEvent = async () => {
    try {
      const newReminder = {
        title: reminder,
        remind_time: dayjs(selectedDate)
          .set('hour', startTime.hour())
          .set('minute', startTime.minute())
          .toISOString(),
      };

      const response = await axios.post('http://127.0.0.1:8000/api/reminders/', newReminder, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const newEvent = {
        id: response.data.id,
        title: response.data.title,
        start: response.data.remind_time,
        allDay: false,
      };
      setEvents([...events, newEvent]);
      closeModal();
    } catch (err) {
      console.error('Error adding reminder:', err);
    }
  };

  const handleEditEvent = async () => {
    try {
      const updatedReminder = {
        title: reminder,
        remind_time: dayjs(selectedDate)
          .set('hour', startTime.hour())
          .set('minute', startTime.minute())
          .toISOString(),
      };

      await axios.put(`http://127.0.0.1:8000/api/reminders/${editEventId}/`, updatedReminder, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedEvents = events.map((event) =>
        event.id === editEventId
          ? { ...event, title: reminder, start: updatedReminder.remind_time }
          : event
      );
      setEvents(updatedEvents);
      closeModal();
    } catch (err) {
      console.error('Error editing reminder:', err);
    }
  };

  const handleDateClick = (arg) => {
    openModal(arg.dateStr);
  };

  const handleEventClick = ({ event }) => {
    openModal(event.startStr, event);
  };

  return (
    <Container sx={{ paddingTop: '20px' }} className="calendar-container">
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        ref={calendarRef}
        defaultView="dayGridMonth"
        dateClick={handleDateClick}
        displayEventTime={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        buttonText={{
          today: 'Today',
          day: 'Day',
          month: 'Month',
          week: 'Week',

        }}
        selectable={true}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]}
        events={events}
        eventClick={handleEventClick}
      />

      {modalIsOpen && (
        <AddReminder
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          editMode={editMode}
          selectedDate={selectedDate}
          reminder={reminder}
          startTime={startTime}
          setReminder={setReminder}
          setSelectedDate={setSelectedDate}
          setStartTime={setStartTime}
          handleAddEvent={handleAddEvent}
          handleEditEvent={handleEditEvent}
        />
      )}
    </Container>
  );
};

export default CalendarComponent;