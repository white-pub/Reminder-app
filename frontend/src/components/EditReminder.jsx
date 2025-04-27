import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import dayjs from 'dayjs';
import { TextField, Button, Box } from '@mui/material';

const EditReminder = ({ isOpen, onRequestClose, reminderData, onEditReminder }) => {
  const [reminder, setReminder] = useState('');
  const [startTime, setStartTime] = useState(dayjs());

  useEffect(() => {
    if (reminderData) {
      setReminder(reminderData.title);
      setStartTime(dayjs(reminderData.start));
    }
  }, [reminderData]);

  const handleEdit = () => {
    if (!reminderData) return;
    const updatedReminder = {
      ...reminderData,
      title: reminder,
      start: startTime.toISOString(),
    };
    onEditReminder(updatedReminder);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Edit Reminder">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <TextField
          label="Reminder"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          fullWidth
        />
        <TextField
          label="Start Time"
          type="datetime-local"
          value={startTime.format('YYYY-MM-DDTHH:mm')}
          onChange={(e) => setStartTime(dayjs(e.target.value))}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Save Changes
        </Button>
        <Button variant="outlined" onClick={onRequestClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

EditReminder.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  reminderData: PropTypes.object,
  onEditReminder: PropTypes.func.isRequired,
};

export default EditReminder;