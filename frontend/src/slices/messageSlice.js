/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import remove from 'lodash/remove.js';

import { actions as channelsActions } from './channelSlice.js';

const slice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { channelId } = payload;
        remove(state.messages, (message) => message.channelId === channelId);
      })
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      });
  },
});

export const { actions } = slice;
export default slice.reducer;
