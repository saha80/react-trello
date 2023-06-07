import 'jest-styled-components';
const initStoryshots = require('@storybook/addon-storyshots').default;
initStoryshots({
  storyNameRegex: /^((?!.*?DontTest).)*$/
});
