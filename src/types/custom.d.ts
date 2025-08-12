// This file tells TypeScript how to handle imports for .jsx files.
// It declares that any imported .jsx file will have a default export of type 'any'.
declare module '*.jsx' {
  const component: any;
  export default component;
} 