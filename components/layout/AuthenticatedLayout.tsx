import React from 'react';
import { Navbar, SideBar } from '..'
import { useRouter } from 'next/router';
import { ACCESS_TOKEN } from '../../utils';


const AuthenticatedLayout: React.FC = ({ children }) => {
    const router = useRouter();

    React.useEffect(() => {
        if (!!!window.sessionStorage.getItem(ACCESS_TOKEN)) {
            router.replace('/auth/login');
        }
    }, [router])

    return (
        <div>
            < Navbar />
            <div className="flex">
                <SideBar />
                <div className="w-screen m-3">{children}</div>
            </div>
        </div>
    )
}

export default AuthenticatedLayout;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // Parse
//     const cookies = parseCookies(context);
//     console.log('server cookies', cookies)

//     if (!cookies || !cookies[ACCESS_TOKEN]) {
//         console.log('***********************************************************8')
//         redirectUser(context, "/auth/login");
//     }

//     return { props: cookies }
// }



// const redirectUser = (context: GetServerSidePropsContext<ParsedUrlQuery>, location: string) => {
//     if (context.req) {
//         context.res.writeHead(302, { Location: location });
//         context.res.end();
//     } else {
//         Router.push(location);
//     }
// }