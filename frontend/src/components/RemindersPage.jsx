import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);

  // Fetch reminders from the API
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reminders/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReminders(response.data);
      } catch (err) {
        console.error('Error fetching reminders:', err);
      }
    };

    fetchReminders();
  }, []);

  return (
    <Container sx={{ paddingTop: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        List of Reminders
      </Typography>
      <List>
        {reminders.map((reminder) => (
          <ListItem key={reminder.id}>
            <ListItemText
              primary={reminder.title}
              secondary={`${new Date(reminder.remind_time).toLocaleDateString()} at ${new Date(reminder.remind_time).toLocaleTimeString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default RemindersPage;