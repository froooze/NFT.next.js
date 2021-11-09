import { useEffect } from "react";
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { Text, Center, Grid, Col, Paper } from '@mantine/core'

const SEO = dynamic(() => import('../components/SEO'));
import { useAnalytics } from '../components/states';

function About(properties) {
  const { t } = useTranslation('about');
  const config = properties.config;

  let [analytics, setAnalytics] = useAnalytics();
  useEffect(async () => {
    if (analytics && config.google_analytics.length) {
      const ReactGA = (await import('react-ga4')).default
      ReactGA.initialize(config.google_analytics);
      ReactGA.pageview('About')
    }
  }, [analytics]);

  return (
    <SEO
      description={t('header_description', {title: config.title})}
      title={t('header_title')}
      siteTitle={config.title}
    />,
    <Grid grow>
      <Col span={12} key={"Index featured NFT"}>
        <Paper padding="md" shadow="xs">
          <Text size="lg">
            About Bitshares NFTs
          </Text>
          <Text>
            {t('p1')}<a href="https://bitshares.org">{t('a1')}</a>
          </Text>
          <Text>
            {t('p2')}<a href="https://github.com/Bit20-Creative-Group/BitShares-NFT-Specification">{t('a2')}</a>.{t('p3')}
          </Text>
          <Text>
            {t('p4')}<a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t('a3')}</a>. {t('p5')}.
          </Text>
        </Paper>
      </Col>
    </Grid>

  );
}

export const getStaticProps = async ({ locale }) => {

  const config = require('../components/config.json');
  const {serverSideTranslations} = (await import('next-i18next/serverSideTranslations'));

  return {
    props: {
      config: config,
      ...(await serverSideTranslations(locale, ['about', 'nav'])),
    }
  };
}

export default About
