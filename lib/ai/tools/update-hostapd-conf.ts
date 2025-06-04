import { tool } from 'ai';
import { z } from 'zod';
import { updateHostapdFile } from '@/lib/file/hostapd';

export const updateHostapdConf = tool({
  description: `
    Update the hostapd Wi-Fi AP configuration, including SSID, password, and other settings.
    Only update the fields (e.g., SSID, password) that the user explicitly mentions.
    Do NOT change any field unless the user has requested its modification.

    For example:
    - If the user says "change Wi-Fi name to XXX", only change the SSID.
    - If the user says "change password to YYY", only update the password.
    - If the user gives both, then update both.

    Avoid applying defaults or resetting unspecified values.
  `,
  parameters: z.object({
    driver: z
      .string()
      .describe('The driver to use for the Wi-Fi interface (e.g., nl80211)')
      .optional(),
    ctrl_interface: z
      .string()
      .describe('Control interface path for hostapd')
      .optional(),
    ctrl_interface_group: z
      .string()
      .describe('Control interface group (e.g., 0)')
      .optional(),
    auth_algs: z
      .string()
      .describe('Authentication algorithms (e.g., 1)')
      .optional(),
    wpa_key_mgmt: z
      .string()
      .describe('WPA key management (e.g., WPA-PSK)')
      .optional(),
    beacon_int: z.string().describe('Beacon interval (e.g., 100)').optional(),
    ssid: z
      .string()
      .describe('The SSID (network name) of the Wi-Fi')
      .optional(),
    channel: z.string().describe('The Wi-Fi channel (e.g., 1)').optional(),
    hw_mode: z
      .string()
      .describe('Hardware mode (e.g., g for 2.4GHz)')
      .optional(),
    ieee80211n: z
      .string()
      .describe('Enable/disable 802.11n (0 or 1)')
      .optional(),
    wpa_passphrase: z
      .string()
      .describe('The WPA passphrase (password)')
      .optional(),
    interface: z
      .string()
      .describe('The network interface name (e.g., wlan0)')
      .optional(),
    wpa: z.string().describe('WPA mode (e.g., 2)').optional(),
    wpa_pairwise: z
      .string()
      .describe('WPA encryption algorithm (e.g., CCMP)')
      .optional(),
    country_code: z.string().describe('Country code (e.g., CN)').optional(),
    ignore_broadcast_ssid: z.string().describe('Hide SSID (0 or 1)').optional(),
  }),
  execute: async (fields) => {
    try {
      await updateHostapdFile(fields);

      return {
        hostapdConfig: fields,
        success: true,
        message: 'Wi-Fi configuration updated successfully.',
      };
    } catch (err) {
      console.error('Error updating Wi-Fi configuration:', err);
      return {
        hostapdConfig: fields,
        success: false,
        content: 'Failed to update Wi-Fi settings.',
      };
    }
  },
});
