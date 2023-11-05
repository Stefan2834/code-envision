import '../app/globals.css'
import Layout from '../components/Layout'
import { useState, useEffect, useRef, ReactNode } from 'react'



interface AppProps {
    Component: React.ComponentType<any>;
    pageProps: {
        session: any;
    };
}


export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
