import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

const List = dynamic(() => import('../components/List'));
const SEO = dynamic(() => import('../components/SEO'));

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useAnalytics } from '../components/states';

function Listings (properties) {
  const { t } = useTranslation('listings');
  const config = properties.config;

  let [analytics, setAnalytics] = useAnalytics();
  useEffect( async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('Listings')
    }
  }, [analytics]);

  return (
    <SEO
      description={t('header_description')}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <List {...properties}/>
  );
}


export const getStaticProps = async ({ locale }) => {

  const art = require('../components/art.json');
  const config = require('../components/config.json');

  return {
    props: {
      config: config,
      art: art,
      ...(await serverSideTranslations(locale, ['listings', 'nav'])),
    }
  };
}


export default Listings
