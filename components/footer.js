import Link from 'next/link';
export default function Footer({ pageData }) {
    return (
        <div className="w-full pt-6 pb-12 bg-black">
            <div className="max-w-screen-lg mx-auto text-white">
                <div className="flex justify-between pb-4 mt-4">
                    <div className="justify-start">
                        <div className='text-md font-bold'>
                            {pageData.layoutTr["About this portal"]}
                        </div>
                    </div>
                    <div className="justify-end">
                        <span className='px-2'>{pageData.layoutTr["Terms of Use"]}</span>
                        <span className='px-2'>{pageData.layoutTr["Privacy Policy"]}</span>
                        <Link href={`/en`} key="en" className='px-2'>english</Link>
                        <Link href={`/fr`} key="fr" className='px-2'>Français</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
