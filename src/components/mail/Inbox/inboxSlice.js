// inboxSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emails: [],
  unreadCount: 0
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    fetchEmailsSuccess(state, action) {
      state.emails = action.payload.emails;
      state.unreadCount = action.payload.unreadCount;
    },
    deleteEmailSuccess(state, action) {
      const deletedEmail = state.emails.find(email => email.id === action.payload);
      if (!deletedEmail.read) {
        state.unreadCount -= 1;
      }
      state.emails = state.emails.filter(email => email.id !== action.payload);
    },
    markAsReadSuccess(state, action) {
      const emailToUpdate = state.emails.find(email => email.id === action.payload);
      if (!emailToUpdate.read) {
        state.unreadCount -= 1;
      }
      emailToUpdate.read = true;
    }
  }
});

export const { fetchEmailsSuccess, deleteEmailSuccess, markAsReadSuccess } = inboxSlice.actions;

export default inboxSlice.reducer;
