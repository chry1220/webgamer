import Link from 'next/link';
export default function Footer({ home, pageData }) {
    return (
        <div className="w-full pt-6 pb-12 bg-black">
            <div className="max-w-screen-xl mx-auto text-white">
                <div className="flex justify-between pb-4 mt-4">
                    <div className="justify-start">
                        <div className='text-lg font-bold'>
                            <Link href={`/en`} key="en" className='px-2'>
                                <i className="fa-brands fa-discord"></i>
                            </Link>
                            <Link href={`/en`} key="en" className='px-2'>
                                <i className="fa-brands fa-twitter"></i>
                            </Link>
                            <Link href={`/about`} key="about" className='px-4'>
                                {pageData.layoutTr["About this portal"]}
                            </Link>
                        </div>
                    </div>
                    <div className="justify-end">
                        <Link href={`/termsofuse`} className='px-2'>{pageData.layoutTr["Terms of Use"]}</Link>
                        <Link href={`/privacypolicy`} className='px-2'>{pageData.layoutTr["Privacy Policy"]}</Link>
                        <Link href={`/en`} key="en" className='px-2'>english</Link>
                        <Link href={`/fr`} key="fr" className='px-2'>Français</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}