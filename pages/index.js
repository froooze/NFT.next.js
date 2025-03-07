import { useEffect, useMemo } from 'react';

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";

import dynamic from 'next/dynamic';
import { isMobile, isIOS, isSafari, isMobileSafari } from 'react-device-detect';

import { Text, Center, Grid, Col, Container, Paper, Button, Group } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { useViewportSize } from '@mantine/hooks';

import { analyticsNotification } from '../lib/analyticsNotification';
import CarouselElement from "../components/Carousel"
import SEO from "../components/SEO"
import { useEnvironment, useAnalytics, useApproval } from '../components/states';

function Home(props) {

  const { t } = useTranslation();
  let [environment, setEnvironment] = useEnvironment();
  let env = environment ? environment : 'production';
  const { height, width } = useViewportSize();

  let paperWidth;
  if (width < 576) { //xs
    paperWidth = 300;
  } else if (width < 768) { //sm
    paperWidth = width * 0.75;
  } else if (width < 1000) { //md
    paperWidth = width * 0.5;
  } else if (width < 1280) { //lg
    paperWidth = width * 0.6;
  } else if (width < 1500) { //xl
    paperWidth = width * 0.5;
  } else {
    paperWidth = width * 0.4;
  }

  let config = props.config;
  let nfts = env === 'production' ? props.minProdNFTS : props.minStagingNFTS;

  let [analytics, setAnalytics] = useAnalytics();
  let [approval, setApproval] = useApproval();
  const notifications = useNotifications();

  useEffect(() => {
    async function sendAnalytics() {
      if (approval === "request") {
        analyticsNotification(notifications, setApproval, setAnalytics)
      }
      if (analytics && config.google_analytics.length) {
        const ReactGA = (await import('react-ga4')).default
        ReactGA.initialize(config.google_analytics);
        ReactGA.pageview('Index');
      }
    }
    sendAnalytics();
  }, [analytics]);

  const carouselMemo = useMemo(() => <CarouselElement
                                       nfts={nfts}
                                       isMobile={isMobile}
                                       isApple={isIOS || isSafari || isMobileSafari}
                                       width={paperWidth}
                                     />, [nfts]);

  const trading = useMemo(() => (
                    <Col span={6} xs={12} sm={6} md={6} lg={6} key={"Trading"}>
                      <Center>
                        <Paper padding="md" shadow="sm" withBorder sx={{textAlign: 'center'}}>
                          <Text size="lg">
                            {t("mainpage.traders.header")}
                          </Text>
                          <Text size="md">
                            {t("mainpage.traders.body1a")}<a href="https://how.bitshares.works/en/master/user_guide/create_account.html">{t("mainpage.traders.a1")}</a>{t("mainpage.traders.body1b")}
                          </Text>
                          <a href={`https://wallet.bitshares.org`}>
                            <Button sx={{margin: "5px"}} variant="outline">Bitshares.org</Button>
                          </a>
                          <a href={`https://ex.xbts.io/`}>
                            <Button sx={{margin: "5px"}} variant="outline">XBTS.io</Button>
                          </a>
                          <a href={`https://dex.iobanker.com/`}>
                            <Button sx={{margin: "5px"}} variant="outline">ioBanker DEX</Button>
                          </a>
                          <a href={`https://www.gdex.io/`}>
                            <Button sx={{margin: "5px"}} variant="outline">GDEX.io</Button>
                          </a>
                          <a href={`https://github.com/bitshares/bitshares-ui/releases`}>
                            <Button sx={{margin: "5px"}} variant="outline">{t("mainpage.traders.a2")}</Button>
                          </a>
                        </Paper>
                      </Center>
                    </Col>
                  ), [t]);

  const tips = useMemo(() => (
    <Col span={12} xs={12} sm={12} md={6} lg={6} key={"BTS_Info"}>
      <Center>
        <Paper padding="md" shadow="sm" withBorder sx={{textAlign: 'center'}}>
          <Text size="lg">
            {t("mainpage.benefits.header")}
          </Text>
          <Text size="md">
            {t("mainpage.benefits.body1")}<a href="https://news.bitshares.org/ethereum-vs-bitshares-sustainability-fees-comparison/">{t("mainpage.benefits.a1")}</a>.
          </Text>
          <Text size="md">
            {t("mainpage.benefits.body2")}<a href="https://how.bitshares.works/en/master/technology/dpos.html">{t("mainpage.benefits.a2")}</a>.
          </Text>
          <Text size="md">
            {t("mainpage.benefits.body3")}<a href="https://how.bitshares.works/en/master/technology/bitshares_features.html#industrial-performance-and-scalability">{t("mainpage.benefits.a3")}</a>;{t("mainpage.benefits.body4")}
          </Text>
        </Paper>
      </Center>
    </Col>
  ), [t])

  return ([
    <SEO
      description={t('mainpage.header_description', {title: config.title})}
      title={t('mainpage.header_title')}
      siteTitle={config ? config.title : ''}
      key="seo"
    />,
    <Grid grow key={"Index featured NFT"}>
      <Col span={12}>
        <Center>
          <Text size="md">
            {t("mainpage.featured")}
          </Text>
        </Center>
        <Center>
          <Paper padding="sm" shadow="sm" withBorder>
            <div style={{width: paperWidth, margin: 'auto' }}>
              {carouselMemo}
            </div>
          </Paper>
        </Center>
      </Col>
    </Grid>,
    <Grid grow key={"tips"}>
      {trading ? trading : undefined}
      {tips ? tips : undefined}
    </Grid>
  ])
}

export const getStaticProps = async ({ locale }) => {

  let config = require('../components/config.json');
  let artJSON = require('../components/art.json');

  let prodNFTS = artJSON.production.map(item => require(`../components/assets/${item.name}.json`));
  let minProdNFTS = prodNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  let stagingNFTS = artJSON.staging.map(item => require(`../components/assets/${item.name}.json`));
  let minStagingNFTS = stagingNFTS.map(nft => {
    return {
      symbol: nft.symbol,
      market: nft.description.market,
      title: nft.description.nft_object.title,
      artist: nft.description.nft_object.artist,
      media_json: nft.description.nft_object.media_json ? true : false
    }
  });

  return {
    props: {
      minProdNFTS,
      minStagingNFTS,
      config,
    }
  };
};

export default Home
