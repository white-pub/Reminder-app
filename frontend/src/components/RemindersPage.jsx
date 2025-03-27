import React from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const reminders = [
  { id: 1, name: 'Doctor Appointment', date: '2025-03-23', time: '10:00 AM' },
  { id: 2, name: 'Team Meeting', date: '2025-03-24', time: '02:00 PM' },
  { id: 3, name: 'Project Deadline', date: '2025-03-25', time: '11:59 PM' },
];

const RemindersPage = () => {
  return (
    <Container sx={{paddingTop: '20px'}}>
      <Typography variant="h4" component="h2" gutterBottom>
        List of Reminders
      </Typography>
      <List>
        {reminders.map((reminder) => (
          <ListItem key={reminder.id}>
            <ListItemText
              primary={reminder.name}
              secondary={`${reminder.date} at ${reminder.time}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default RemindersPage;