import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스포츠 일정 플래너',
  description: '선택한 날짜의 스포츠 경기 일정과 경기장 정보를 확인하고 관리하는 앱'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
