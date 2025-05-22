import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Love/Rate (mini)' },
    { name: 'description', content: 'With love, your movies' },
  ];
}

export default function Home() {
  return <Welcome />;
}
