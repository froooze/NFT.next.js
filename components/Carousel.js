import React, {useState} from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { useGateway } from './states';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useInView } from 'react-intersection-observer';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const { getImage } = require("./images");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing(1)
  },
  a: {
    textDecoration: "none",
    color: theme.palette.text.secondary
  }
}));

function CarouselItem (properties) {
  const classes = useStyles();

  const { t } = useTranslation('carousel');

  let id = properties.id;
  const initAssetData = require(`./assets/${id}.json`);
  const [asset, setAsset] = useState(initAssetData ? initAssetData : undefined);

  let symbol = asset && asset.symbol ? asset.symbol : undefined;
  let description = asset && asset.description ? asset.description : undefined;
  let nft_object = description ? description.nft_object : undefined;
  let title = nft_object && nft_object.title ? nft_object.title : undefined;
  let artist = nft_object && nft_object.artist ? nft_object.artist : undefined;

  let imgURL = require(`../public/images/${symbol}/0.webp`);

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (title && artist && symbol
          ? <div ref={ref} key={id + "_featured_div"}>

                  <Link href={`/nft/${symbol}`} key={`/nft/${symbol}/img`} passHref>
                    <a>
                      {inView ? (
                        <Image
                          alt={`${id}_featured_div`}
                          src={imgURL}
                          placeholder="blur"
                          width={500}
                          height={500}
                        />
                      ) : null}
                    </a>
                  </Link>
                <Link href={`/nft/${symbol}`} key={`/nft/${symbol}/button`} passHref>
                  <a className={classes.a}>
                    <Button className={classes.button} variant="contained">
                      &quot;{title}&quot; {t('carousel:by')} {artist}
                    </Button>
                  </a>
                </Link>
             </div>
          : <div key={id + "_featured_div"}>
              Loading..
             </div>);
}

export default function CarouselElement(properties) {
  let art = properties.art;
  let featured = properties.featured;

  let artIds = featured
                ? art
                  .filter(x => x.featured === true)
                  .map(nft => nft.name)
                : art
                  .map(nft => nft.name);

  let carouselItems = artIds && artIds.length > 0
    ? artIds.map(id => {
        return <CarouselItem id={id} key={`CarouselItem: ${id}`} />;
      }).filter(x => x)
    : [];

  return (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      statusFormatter={(current, total) => `NFT ${current} of ${total}`}
    >
      {carouselItems}
    </Carousel>
  );
}
