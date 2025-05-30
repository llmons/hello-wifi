import { tool } from 'ai';
import { z } from 'zod';
import fs from 'fs/promises';

interface HostapdConfig {
  ssid: string;
  wpa_passphrase: string;
}

export const getHostapdConf = tool({
  description: `Retrieve the current hostapd (Wi-Fi AP host) configuration.`,
  parameters: z.object({}),
  execute: async () => {
    try {
      const content = await fs.readFile('/tmp/hostapd.conf', 'utf-8');
      const lines = content.split('\n');
      const data: HostapdConfig = {
        ssid: '',
        wpa_passphrase: '',
      };
      for (const line of lines) {
        if (line.startsWith('ssid=')) {
          data.ssid = line.split('=')[1];
        }
        if (line.startsWith('wpa_passphrase=')) {
          data.wpa_passphrase = line.split('=')[1];
        }
      }

      console.log('Current hostapd.conf:', data);

      return {
        hostapdConf: data,
        success: true,
        message: 'Successfully retrieved hostapd.conf',
      };
    } catch (err) {
      console.error('Error reading file:', err);
      throw new Error('Failed to read hostapd.conf');
    }
  },
});
