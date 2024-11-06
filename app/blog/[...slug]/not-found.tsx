import Header from '@/app/_components/Header';

export default function NotFound() {
  return (
    <section>
      <Header
        title="404"
        description="page not found :/"
        link={{ href: '/blog', text: '글 목록으로' }}
      />
    </section>
  );
}
