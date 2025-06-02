import { tool } from 'ai';
import { z } from 'zod';
import { getHostapdFile } from '@/lib/file/hostapd';

export const getHostapdConf = tool({
  description: `Retrieve the current hostapd (Wi-Fi AP host) configuration.`,
  parameters: z.object({}),
  execute: async () => {
    try {
      const data = await getHostapdFile();

      return {
        hostapdConf: data,
        success: true,
        message: 'Successfully retrieved hostapd.conf',
      };
    } catch (err) {
      console.error('Error reading hostapd.conf:', err);
      return {
        success: false,
        message: 'Failed to read hostapd.conf',
      };
    }
  },
});
