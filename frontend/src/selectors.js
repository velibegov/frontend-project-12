export const channelsInfo = (state) => state.channels;

export const getCurrentChannel = (state) => {
    const { channels, currentChannelId } = state.channels;
    return channels.find((c) => c.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
    const { currentChannelId } = state.channels;
    const { messages } = state.messages;
    return messages.filter((m) => m.channelId === currentChannelId);
};

export const getChannelsNames = (state) => {
    const { channels } = state.channels;
    return channels.map(({ name }) => name);
};

export const getChannelById = (channelId) => (state) => {
    const { channels } = state.channels;
    return channels.find(({ id }) => channelId === id);
};