import { combineReducers } from '@reduxjs/toolkit';
import channels, { actions as channelsActions, defaultChannelId } from './channelSlice.js';
import messages, { actions as messagesActions } from './messageSlice.js';
import modal, { actions as modalActions } from './modal.js';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export {
  actions,
  defaultChannelId,
};
export default combineReducers({
  channels,
  messages,
  modal,
});
