import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

const AddReminder = ({
  editMode,
  selectedDate,
  reminder,
  startTime,
  setReminder,
  setSelectedDate,
  setStartTime,
  handleAddEvent,
  handleEditEvent,
}) => {
  const selectedDateStartString = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '';

  return (
    <Box sx={{ p: 3, borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Typography variant="h6" gutterBottom>
        {editMode ? 'Edit Reminder' : 'Add Reminder'}
      </Typography>

      <TextField
        label="Pick a Date"
        type="date"
        value={selectedDateStartString}
        onChange={(e) => setSelectedDate(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Reminder"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Start Time"
          value={startTime}
          onChange={(newValue) => setStartTime(newValue)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        color="primary"
        onClick={editMode ? handleEditEvent : handleAddEvent}
      >
        {editMode ? 'Save Changes' : 'Add'}
      </Button>
    </Box>
  );
};

export default AddReminder;