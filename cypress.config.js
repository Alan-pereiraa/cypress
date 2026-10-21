import { defineConfig } from 'cypress';

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
  },
  video: true
});

export default cypressConfig;