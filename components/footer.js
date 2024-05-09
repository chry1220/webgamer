import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Footer({ home, pageData }) {
    const router = useRouter();
    const changeLanguage = (newLang) => {
        const { lang, ...query } = router.query;
        if (query.tag == null && lang){
            const updatedQuery = { ...query, lang: newLang };
            const newUrl = {
                pathname: router.pathname,
                query: updatedQuery,
            };
            router.push(newUrl);
        } else {
            router.push(`/${newLang}`)
        }
    };
    return (
        <div className="w-full pt-6 pb-12 px-3 bg-black">
            <div className="max-w-screen-xl mx-auto text-white">
                <div className="md:flex md:justify-between pb-4 mt-4">
                    <div className="md:justify-start text-center">
                        <div className='text-lg font-bold md:inline'>
                            <Link href={`/en`} className='px-2'>
                                <i className="fa-brands fa-discord"></i>
                            </Link>
                            <Link href={`/en`} className='px-2'>
                                <i className="fa-brands fa-twitter"></i>
                            </Link>
                        </div>
                        <Link href={`/about`} className='md:px-4 text-lg font-bold'>
                            {pageData.layoutTr["About this portal"]}
                        </Link>
                    </div>
                    <div className="md:justify-end text-center md:mt-0 mt-3">
                        <Link href={`/termsofuse`} className='px-2 block sm:inline'>{pageData.layoutTr["Terms of Use"]}</Link>
                        <Link href={`/privacypolicy`} className='px-2 block sm:inline'>{pageData.layoutTr["Privacy Policy"]}</Link>
                        <button onClick={() => changeLanguage('en')} className='px-2 block sm:inline'>english</button>
                        <button onClick={() => changeLanguage('fr')} className='px-2 block sm:inline'>Français</button>

                    </div>
                </div>
            </div>
        </div>
    );
}