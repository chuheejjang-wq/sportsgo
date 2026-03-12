import Link from 'next/link';

type AppNavProps = {
  current: 'planner' | 'admin';
};

export default function AppNav({ current }: AppNavProps) {
  return (
    <nav className="appNav">
      <Link href="/" className={`appNavLink ${current === 'planner' ? 'active' : ''}`}>
        플래너
      </Link>
      <Link href="/admin" className={`appNavLink ${current === 'admin' ? 'active' : ''}`}>
        어드민
      </Link>
    </nav>
  );
}
