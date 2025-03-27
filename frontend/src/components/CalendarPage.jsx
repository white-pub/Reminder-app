import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import './Modal.css';
import { Container } from '@mui/material';
import AddReminder from './AddReminder';
import dayjs from 'dayjs';

const CalendarComponent = () => {
  const calendarRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'hour'));
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [events, setEvents] = useState([
  ]);

  const openModal = (date, event = null) => {
    if (event) {
      setSelectedDate(dayjs(event.start).format('YYYY-MM-DD'));
      setReminder(event.title);
      setStartTime(dayjs(event.start));
      setEndTime(dayjs(event.end));
      setEditMode(true);
      setEditEventId(event.id);
    } else {
      setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
      setReminder('');
      setStartTime(dayjs());
      setEndTime(dayjs().add(1, 'hour'));
      setEditMode(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setReminder('');
    setStartTime(dayjs());
    setEndTime(dayjs().add(1, 'hour'));
    setEditMode(false);
    setEditEventId(null);
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: reminder,
      start: dayjs(selectedDate).set('hour', startTime.hour()).set('minute', startTime.minute()).toISOString(),
      end: dayjs(selectedDate).set('hour', endTime.hour()).set('minute', endTime.minute()).toISOString(),
      allDay: false,
    };
    setEvents([...events, newEvent]);
    closeModal();
  };

  const handleEditEvent = () => {
    const updatedEvents = events.map(event => 
      event.id === editEventId ? { ...event, title: reminder, start: dayjs(selectedDate).set('hour', startTime.hour()).set('minute', startTime.minute()).toISOString(), end: dayjs(selectedDate).set('hour', endTime.hour()).set('minute', endTime.minute()).toISOString() } : event
    );
    setEvents(updatedEvents);
    closeModal();
  };

  const handleDateClick = (arg) => {
    openModal(arg.dateStr);
  };

  const handleEventClick = ({ event }) => {
    openModal(event.startStr, event);
  };

  const handleSelectedDates = (info) => {
    openModal(info.startStr);
  };

  return (
    <Container sx={{paddingTop: '20px'}} className="calendar-container">
      <FullCalendar
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
        ref={calendarRef}
        defaultView="dayGridMonth"
        dateClick={handleDateClick}
        displayEventTime={true}
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        selectable={true}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]}
        events={events}
        select={handleSelectedDates}
        eventClick={handleEventClick}
        eventLimit={3}
      />

      {modalIsOpen && (
        <AddReminder
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          editMode={editMode}
          selectedDate={selectedDate}
          reminder={reminder}
          startTime={startTime}
          endTime={endTime}
          setReminder={setReminder}
          setSelectedDate={setSelectedDate}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          handleAddEvent={handleAddEvent}
          handleEditEvent={handleEditEvent}
        />
      )}
    </Container>
  );
};

export default CalendarComponent;