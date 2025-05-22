import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  // route('sample:::route-does-not-exist', 'routes/sample:::route-does-not-exist.tsx'),
] satisfies RouteConfig;
