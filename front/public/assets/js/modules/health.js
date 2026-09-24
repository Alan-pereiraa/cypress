import { get } from '../api/http-client.js';

export async function checkHealth() {
  return get('/api/health');
}
