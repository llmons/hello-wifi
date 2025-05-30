import { tool } from 'ai';
import { z } from 'zod';

export const getHostapdConf = tool({
  description: 'Get the hostapd(WiFi ap host) configuration of the system',
  parameters: z.object({}),
  execute: async () => {
    const data = {
      ssid: 'MyNetwork',
      password: 'MyPassword',
    };
    return data;
  },
});
