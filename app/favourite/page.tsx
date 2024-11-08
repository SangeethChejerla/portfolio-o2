import Favourite from '@/components/_Favourite/fav-tabs';
import Header from '../_components/Header';

export default function favourite() {
  return (
    <div>
      <Header link={{ href: '/', text: 'Home' }} />
      <Favourite />
    </div>
  );
}
