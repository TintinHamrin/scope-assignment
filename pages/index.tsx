import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTokenFromLocalStorage } from 'lib/scopeApi';
import SearchField from 'components/Search/SearchField/SearchField';

function SearchPage(): JSX.Element {
  const router = useRouter();

  // Redirect if token is missing
  useEffect(() => {
    if (!getTokenFromLocalStorage()) {
      router.push({
        pathname: '/login',
        query: { from: router.pathname },
      });
    }
  }, [router]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 col-span-full xl:col-start-1 xl:col-span-3 relative">
      <div className="block bg-white pt-5 pb-8 border border-transparent relative">
        <SearchField />
      </div>
    </div>
  );
}

export default SearchPage;
