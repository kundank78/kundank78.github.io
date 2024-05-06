import React, { useEffect, useRef } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import './styles.module.css'

function Images() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    const mainRef = useRef(null);

    useEffect(() => {
        mainRef.current.hidden = false;
    });

    return (
        <Layout title="Images" description={siteConfig.tagline}>
            <main ref={mainRef} hidden={true}>
                <iframe src="https://www.behance.net/embed/project/126282879?ilo0=1" height="316" width="404"
                        allowFullScreen frameBorder="0" allow="clipboard-write"
                        className={"m-2"}
                        refererPolicy="strict-origin-when-cross-origin"></iframe>
                <iframe src="https://www.behance.net/embed/project/197897587?ilo0=1" height="316" width="404"
                        allowFullScreen lazyload frameBorder="0" allow="clipboard-write"
                        className={"m-2"}
                        refererPolicy="strict-origin-when-cross-origin"></iframe>
                <iframe src="https://www.behance.net/embed/project/197892587?ilo0=1" height="316" width="404"
                        allowFullScreen lazyload frameBorder="0" allow="clipboard-write"
                        className={"m-2"}
                        refererPolicy="strict-origin-when-cross-origin"></iframe>
                <iframe src="https://www.behance.net/embed/project/197893135?ilo0=1" height="316" width="404"
                        allowFullScreen lazyload frameBorder="0" allow="clipboard-write"
                        className={"m-2"}
                        refererPolicy="strict-origin-when-cross-origin"></iframe>
                <iframe src="https://www.behance.net/embed/project/197892027?ilo0=1" height="316" width="404"
                        allowFullScreen lazyload frameBorder="0" allow="clipboard-write"
                        className={"m-2"}
                        refererPolicy="strict-origin-when-cross-origin"></iframe>
            </main>

            <Link to={'https://kkundan09.myportfolio.com/'}>
                <button
                    className="float-right border-0 rounded m-10 ml-2 p-1 hover:bg-primary-800 transition
                        text-white text-lg cursor-pointer">
                    See More!<span className="pl-1 animate-pulse">▎</span>
                </button>
            </Link>
        </Layout>
    );
}

export default Images;
