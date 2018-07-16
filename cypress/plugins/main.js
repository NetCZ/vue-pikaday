import path from 'path';
import rollup from '@cypress/rollup-preprocessor';

export default (on) => {
  on('file:preprocessor', rollup(path.resolve('cypress/rollup.config')));
};
