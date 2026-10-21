import { defineConfig } from 'cypress';

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    supportFile: false,
  },
  video: true
});

export default cypressConfig;