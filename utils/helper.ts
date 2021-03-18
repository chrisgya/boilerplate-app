import jwt_decode from "jwt-decode";
import { GetServerSidePropsContext } from "next";
import Router from 'next/router';
import { ParsedUrlQuery } from "node:querystring";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";


export const decodeToken = (token: string) => jwt_decode(token);

export const logout = (router: any) => {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    router.replace("/auth/login");
}

export const getQueryString = (locationHook: any, paramName: string) => {
    const searchParams = new URLSearchParams(locationHook().search);
    return searchParams.get(paramName)
}

export const redirectUser = (context: GetServerSidePropsContext<ParsedUrlQuery> | null, location: string, isReplacing?: boolean) => {
    if (context && context.req) {
        context.res.writeHead(302, { Location: location });
        context.res.end();
    } else if (isReplacing) {
        Router.replace(location);
    } else {
        Router.push(location);
    }
}