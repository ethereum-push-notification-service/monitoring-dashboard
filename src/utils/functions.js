import axios from 'axios';
import settings from '../settings';

export const getSubscribers = async ({
  chain,
  startDate = new Date('2021-01-01'),
  endDate = new Date('2023-01-01'),
  channel = 'All',
}) => {
  try {
    const res = await axios.get(`${settings.BACKEND_URL}/analytics/subscriber`, {
      params: {
        startDate,
        endDate,
        channel,
        source: chain,
      },
    });
    // console.log('subscribers', res.data);
    return res.data;
  } catch (e) {
    console.log('Error occured in subscribers', e);
  }
};

export const getAllChannelsForChain = async (chain) => {
  const subscribers = await getSubscribers({
    chain,
  });
  // Retrieving and formatting Subscriber data
  //   logic was copied from the analytics dashboard
  const { subscriberAnalytics } = subscribers;
  const channelSubscriberDetails = subscribers.channelDetails;
  const channelSubscriberData = {};
  const channels = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < subscriberAnalytics.length; i++) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in subscriberAnalytics[i]) {
      if (key === 'date') {
        // eslint-disable-next-line no-continue
        continue;
      } else if (channelSubscriberData[key]) {
        channelSubscriberData[key] += subscriberAnalytics[i][key].subscriber;
      } else {
        channelSubscriberData[key] = 0;
        channelSubscriberData[key] += subscriberAnalytics[i][key].subscriber;
      }
    }
  }
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in channelSubscriberData) {
    const { name } = channelSubscriberDetails[key];
    channels.push(name);
  }
  const uniqueChannels = [...new Set(channels.map((c) => c.toLowerCase()))];
  return uniqueChannels;
};

export const getAllChannels = async () => {
  const res = await Promise.all(settings.SOURCES.map(getAllChannelsForChain));
  return [...new Set(res.flat())];
};
//
