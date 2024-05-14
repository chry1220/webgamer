import Link from 'next/link';
import { useRouter } from 'next/router';
import { enableLang } from '../utils/utils';
import { SlideFade } from '@chakra-ui/react';
export default function Footer({ home, pageData }) {
    const router = useRouter();
    let { lang, ...query } = router.query;
    const shortLangs = Object.keys(enableLang);
    const changeLanguage = (newLang) => {

        let { lang, ...query } = router.query;
        if (query.tagSlug == null && lang) {
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
    if (!lang) lang = "en";
    return (
        <div className="w-full pt-6 pb-12 px-3 bg-black">
            <SlideFade in={true} offsetY='50px'>
                <div className="max-w-[1280px] mx-auto text-white">
                    <div className="md:flex md:justify-between pb-4 mt-4">
                        <div className="md:justify-start text-center">
                            <div className='text-lg font-bold md:inline'>
                                <Link href={`/discord`} className='px-2'>
                                    <i className="fa-brands fa-discord"></i>
                                </Link>
                                <Link href={`https://twitter.com/webgamerio`} className='px-2'>
                                    <i className="fa-brands fa-twitter"></i>
                                </Link>
                            </div>
                            <Link href={`/${lang}/about`} className='md:px-4 text-lg font-bold'>
                                {pageData.layoutTr["About this portal"]}
                            </Link>
                        </div>
                        <div className="md:justify-end text-center md:mt-0 mt-3">
                            <Link href={`/${lang}/terms`} className='px-2 block sm:inline'>{pageData.layoutTr["Terms of Use"]}</Link>
                            <Link href={`/${lang}/privacy`} className='px-2 block sm:inline'>{pageData.layoutTr["Privacy Policy"]}</Link>
                            {
                                shortLangs.map(sl => (
                                    lang == sl ? null : <div key={sl} onClick={() => changeLanguage(sl)} className='px-2 block sm:inline cursor-pointer'>{enableLang[sl]}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </SlideFade>
        </div>
    );
}