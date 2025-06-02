'use client';

import * as React from 'react';
import {useTheme} from 'next-themes';
import Link from "next/link";
import Image from "next/image";

export function PowerBy() {

    return (
        <div>
            <span>Power by</span>
            <Link href='https://react.dev'>
                <Image src="https://react.dev/favicon.ico" alt="react" width={64} height={64}/>
            </Link>
            <Link href='https://nextjs.org/'>
                <Image src="https://nextjs.org/favicon.ico" alt="react" width={64} height={64}/>
            </Link>
            <span>Template from</span>
            <Link href='https://vercel.com/'>
                <Image src="https://vercel.com/favicon.ico" alt="react" width={64} height={64}/>
            </Link>
        </div>
    );
}
