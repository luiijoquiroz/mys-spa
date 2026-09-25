import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Con `globals: false` Testing Library no registra su limpieza automática: sin esto, el DOM
// de un test se acumula en el siguiente.
afterEach(() => {
  cleanup();
});
