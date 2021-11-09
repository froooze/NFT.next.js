import React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import Link from 'next/link';
import Head from 'next/head'
import { useTranslation } from 'next-i18next';
import {
  AppShell,
  Navbar,
  List,
  Group,
  Header,
  MediaQuery,
  Burger,
  Menu,
  MantineProvider,
  NormalizeCSS,
  GlobalStyles,
  Grid,
  Col,
  Container,
  Divider,
  Text,
  Button,
  ActionIcon,
  TypographyStylesProvider,
  ColorSchemeProvider,
  ColorScheme
} from '@mantine/core';
import { useHover } from '@mantine/hooks';

import { IoLanguageOutline, IoSunnyOutline, IoMoonOutline, IoLogoTwitter } from "react-icons/io5";

import '../components/noScrollbars.css';

import NavButton from "../components/NavButton";

import { useTheme, useLanguage, useEnvironment } from '../components/states';
import config from "../components/config.json";
const locales = [
  {'language': 'en', 'aka': 'English'},
  {'language': 'da', 'aka': 'Dansk'},
  {'language': 'de', 'aka': 'Deutsche'},
  {'language': 'ee', 'aka': 'Eestlane'},
  {'language': 'es', 'aka': 'Español'},
  {'language': 'th', 'aka': 'ไทย'},
  {'language': 'it', 'aka': 'Italiano'},
  {'language': 'fr', 'aka': 'Français'},
  {'language': 'ko', 'aka': '한국어'},
  {'language': 'pt', 'aka': 'Português'},
  {'language': 'ja', 'aka': '日本語'},
  {'language': 'ru', 'aka': 'русский'}
];

function MyApp(props) {
  const { Component, pageProps } = props;
  const { hovered, ref } = useHover();

  const router = useRouter();
  const { t } = useTranslation('nav');

  const [colorScheme, setColorScheme] = useTheme();
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [language, setLanguage] = useLanguage('en');
  const [environment, setEnvironment] = useEnvironment();
  const [opened, setOpened] = useState(false);

  return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" />
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary" key="twcard" />
      </Head>,
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ colorScheme }}
          >
            <GlobalStyles />
            <TypographyStylesProvider sx={{textDecoration: "none"}}>
              <AppShell
                navbarOffsetBreakpoint="sm"
                fixed
                navbar={
                  <Navbar
                    padding="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ base: 200, breakpoints: { sm: '100%', lg: 300 } }}
                    zIndex={1}
                  >
                    <NavButton
                      url={"/"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link1')}
                    />
                    <NavButton
                      url={"/gallery"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link2')}
                    />
                    <NavButton
                      url={"/search"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link4')}
                    />
                    <NavButton
                      url={"/news"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link9')}
                    />
                    <NavButton
                      url={"/about"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link5')}
                    />
                    <NavButton
                      url={"/viewers"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link7')}
                    />
                    <NavButton
                      url={"/settings"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link8')}
                    />
                    <NavButton
                      url={"/license"}
                      colorScheme={colorScheme}
                      language={language}
                      inputText={t('link6')}
                    />
                  </Navbar>
                }
                header={
                  <Header height={70} padding="md">
                    {/* You can handle other responsive styles with MediaQuery component or createStyles function */}
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <Burger
                          opened={opened}
                          onClick={() => setOpened((o) => !o)}
                          size="sm"
                          color={"grey"}
                          mr="xl"
                        />
                      </MediaQuery>

                      <Text size="md" inherit>
                        <Link href="/" locale={language}>
                          <a style={{color: colorScheme === 'light' ? 'black' : 'white'}}>
                            {t("header")}
                          </a>
                        </Link>
                      </Text>
                      <Text size="md" inherit sx={{flexGrow: 1, paddingLeft: '5px'}}>
                        <Link href="/" locale={language}>
                          <a style={{color: colorScheme === 'light' ? 'black' : 'white'}}>
                            {environment && environment === 'staging' ? t("staging"): null}
                          </a>
                        </Link>
                      </Text>

                      <Menu
                        id="long-menu"
                        trigger="click"
                        closeOnScroll={false}
                        gutter={20}
                        control={<ActionIcon variant="hover"><IoLanguageOutline/></ActionIcon>}
                        size="sm"
                        shadow="xl"
                        title="Translate"
                      >
                        {locales.map((option) => (
                          <Menu.Item
                            component="a"
                            locale={option.language}
                            href={`${router.asPath}`}
                            key={option.language}
                            selected={option.language === language}
                            onClick={() => { setLanguage(option.language) }}
                          >
                            {option.aka}
                          </Menu.Item>
                        ))}
                      </Menu>

                      <ActionIcon
                        onClick={() => toggleColorScheme()}
                        color={colorScheme === 'dark' ? 'yellow' : 'blue'}
                        variant="hover"
                        title="Toggle color scheme"
                      >
                        {
                          colorScheme === 'dark'
                            ? <IoSunnyOutline/>
                            : <IoMoonOutline/>
                        }
                      </ActionIcon>

                      <Link href={`https://twitter.com/${config.twitter}`} passHref>
                        <ActionIcon
                          variant="hover"
                          title="Twitter"
                        >
                          <IoLogoTwitter/>
                        </ActionIcon>
                      </Link>

                    </div>
                  </Header>
                }
              >
                <NormalizeCSS />
                <Container fluid>
                  <Component {...pageProps} />
                  <Grid>
                    <Col span={12} xs={12} key={"footer 0"} sx={{textAlign: 'center'}}>
                      <Divider style={{marginTop: '15px'}}/>
                    </Col>
                    <Col span={12} xs={12} sm={6} key={"footer 1"}>
                      <Text size="xl">
                        {config.title}
                      </Text>
                      <Text size="md">
                        {t('footer_1')}
                      </Text>
                      <Text size="sm">
                        {t('footer_2')}
                      </Text>
                      <Text size="sm">
                        {t('footer_3')}<Link style={{color: 'primary'}} href={"https://nextjs.org/"} passHref><a>Next.js</a></Link>{t('footer_4')}<Link href={"https://vercel.com"} passHref><a sx={{color: 'text.primary'}}>Vercel</a></Link>
                      </Text>
                    </Col>
                    <Col span={12} xs={12} sm={2} key={"footer 2"}>
                      <Text size="xl">
                        {t('footer_links')}
                      </Text>
                      <Link href={"https://bitshares.org/"} passHref>
                        <a>
                          Bitshares.org
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://github.com/bitshares"} passHref>
                        <a>
                          GitHub
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://bitsharestalk.org/"} passHref>
                        <a>
                          Forum
                        </a>
                      </Link>
                    </Col>
                    <Col span={12} xs={12} sm={2} key={"footer 3"}>
                      <Text size="xl">
                        {t('footer_wallets')}
                      </Text>
                      <Link href={"https://wallet.bitshares.org"} passHref>
                        <a>
                          Bitshares.org
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://ex.xbts.io/"} passHref>
                        <a>
                          XBTS.io
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://dex.iobanker.com/"} passHref>
                        <a>
                          ioBanker DEX
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://www.gdex.io/"} passHref>
                        <a>
                          GDEX.io
                        </a>
                      </Link>
                    </Col>
                    <Col span={12} xs={12} sm={2} key={"footer 4"}>
                      <Text size="xl">
                        {t('footer_markets')}
                      </Text>
                      <Link href={"https://cryptoindex.org/coin/bitshares"} passHref>
                        <a>
                          CryptoIndex
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://www.coingecko.com/en/coins/bitshares"} passHref>
                        <a>
                          CoinGecko
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://coinmarketcap.com/currencies/bitshares/"} passHref>
                        <a>
                          CoinMarketCap
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://www.worldcoinindex.com/coin/bitshares"} passHref>
                        <a>
                          WorldCoinIndex
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://coincodex.com/crypto/bitshares/"} passHref>
                        <a>
                          CoinCodex
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://nomics.com/assets/bts-bitshares"} passHref>
                        <a>
                          Nomics
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://bitgur.com/coin/BTS"} passHref>
                        <a>
                          Bitgur
                        </a>
                      </Link>
                      <br/>
                      <Link href={"https://messari.io/asset/bitshares"} passHref>
                        <a>
                          Messari
                        </a>
                      </Link>
                    </Col>
                  </Grid>
                </Container>
              </AppShell>
            </TypographyStylesProvider>
        </MantineProvider>
      </ColorSchemeProvider>
  );
}

export default appWithTranslation(MyApp)
