import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스포츠 유학 일정 생성기',
  description: '선택한 날짜만 모아 보여주는 스포츠 경기 일정 + 구글 지도'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
