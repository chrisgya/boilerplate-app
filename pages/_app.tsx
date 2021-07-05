import '../styles/tailwind.css';
import '../styles/globals.css';
import '../styles/table.css';

import 'react-toastify/dist/ReactToastify.css';
//datepicker & calendar
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
// timepicker
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

// dateTimePicker
import 'react-datetime-picker/dist/DateTimePicker.css';
//import 'react-calendar/dist/Calendar.css';
//import ' react-clock/dist/Clock.css';


import 'quill/dist/quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

import React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { ToastContainer } from "react-toastify";

// Binding events
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {

  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ToastContainer position="bottom-right" />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
