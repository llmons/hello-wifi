import fs from 'fs/promises';

export async function updateWiFiConfig({
  ssid,
  wpa_passphrase,
}: {
  ssid?: string;
  wpa_passphrase?: string;
}) {
  const filePath = '/tmp/hostapd.conf';
  let content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');

  let ssidFound = false;
  let wpa_passphraseFound = false;

  const updatedLines = lines.map((line) => {
    if (ssid && line.startsWith('ssid=')) {
      ssidFound = true;
      return `ssid=${ssid}`;
    } else if (wpa_passphrase && line.startsWith('wpa_passphrase=')) {
      wpa_passphraseFound = true;
      return `wpa_passphrase=${wpa_passphrase}`;
    }
    return line;
  });

  if (ssid && !ssidFound) updatedLines.push(`ssid=${ssid}`);
  if (wpa_passphrase && !wpa_passphraseFound)
    updatedLines.push(`wpa_passphrase=${wpa_passphrase}`);

  await fs.writeFile(filePath, updatedLines.join('\n'), 'utf-8');
}
