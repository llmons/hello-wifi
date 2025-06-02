import fs from 'fs/promises';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const HOSTAPD_CONF_PATH = '/etc/hostapd/hostapd.conf';
const TMP_CONF_PATH = '/tmp/tmp_hostapd.conf';
const BACKUP_CONF_PATH = `${HOSTAPD_CONF_PATH}.bak`;

export async function updateHostapdFile(
  fields: Partial<{
    driver: string;
    ctrl_interface: string;
    ctrl_interface_group: string;
    auth_algs: string;
    wpa_key_mgmt: string;
    beacon_int: string;
    ssid: string;
    channel: string;
    hw_mode: string;
    ieee80211n: string;
    wpa_passphrase: string;
    interface: string;
    wpa: string;
    wpa_pairwise: string;
    country_code: string;
    ignore_broadcast_ssid: string;
  }>
) {
  const filePath = '/tmp/hostapd.conf';
  let content = await fs.readFile(filePath, 'utf-8');

  // const content = await fs.readFile(HOSTAPD_CONF_PATH, 'utf-8');
  const lines = content.split('\n');

  const fieldOrder = [
    'driver',
    'ctrl_interface',
    'ctrl_interface_group',
    'auth_algs',
    'wpa_key_mgmt',
    'beacon_int',
    'ssid',
    'channel',
    'hw_mode',
    'ieee80211n',
    'wpa_passphrase',
    'interface',
    'wpa',
    'wpa_pairwise',
    'country_code',
    'ignore_broadcast_ssid',
  ];

  const foundFlags: Record<string, boolean> = {};
  fieldOrder.forEach((key) => (foundFlags[key] = false));

  const updatedLines = lines.map((line) => {
    const trimmed = line.trim();
    for (const key of fieldOrder) {
      // check & update
      if (
        fields[key as keyof typeof fields] !== undefined &&
        trimmed.startsWith(`${key}=`)
      ) {
        foundFlags[key] = true;
        return `${key}=${fields[key as keyof typeof fields]}`;
      }
    }
    return line;
  });

  for (const key of fieldOrder) {
    // new fields
    if (fields[key as keyof typeof fields] !== undefined && !foundFlags[key]) {
      updatedLines.push(`${key}=${fields[key as keyof typeof fields]}`);
    }
  }

  await fs.writeFile(filePath, updatedLines.join('\n'), 'utf-8');

  // await fs.writeFile(TMP_CONF_PATH, updatedLines.join('\n'), 'utf-8');
  // await execFileAsync('sudo', ['cp', HOSTAPD_CONF_PATH, BACKUP_CONF_PATH]);
  // await execFileAsync('sudo', ['cp', TMP_CONF_PATH, HOSTAPD_CONF_PATH]);
  // await execFileAsync('sudo', ['rm', TMP_CONF_PATH]);
  // await execFileAsync('sudo', ['systemctl', 'restart', 'hostapd']);
}

export interface HostapdConfig {
  driver?: string;
  ctrl_interface?: string;
  ctrl_interface_group?: string;
  auth_algs?: string;
  wpa_key_mgmt?: string;
  beacon_int?: string;
  ssid?: string;
  channel?: string;
  hw_mode?: string;
  ieee80211n?: string;
  wpa_passphrase?: string;
  interface?: string;
  wpa?: string;
  wpa_pairwise?: string;
  country_code?: string;
  ignore_broadcast_ssid?: string;
}

export async function getHostapdFile(): Promise<HostapdConfig> {
  const filePath = '/tmp/hostapd.conf';
  const content = await fs.readFile(filePath, 'utf-8');

  // const content = await fs.readFile(HOSTAPD_CONF_PATH, 'utf-8');
  const lines = content.split('\n');

  const data: HostapdConfig = {};

  for (const line of lines) {
    const trimmed = line.trim();
    const [key, value] = trimmed.split('=');
    if (!key || value === undefined) continue;

    switch (key) {
      case 'driver':
      case 'ctrl_interface':
      case 'ctrl_interface_group':
      case 'auth_algs':
      case 'wpa_key_mgmt':
      case 'beacon_int':
      case 'ssid':
      case 'channel':
      case 'hw_mode':
      case 'ieee80211n':
      case 'wpa_passphrase':
      case 'interface':
      case 'wpa':
      case 'wpa_pairwise':
      case 'country_code':
      case 'ignore_broadcast_ssid':
        data[key] = value;
        break;
    }
  }

  return data;
}
