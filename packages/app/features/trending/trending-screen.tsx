import { Link as SolitoLink } from 'solito/link'
import React, { useEffect, useState } from 'react'

import {
  Avatar,
  Center,
  Image,
  HStack,
  Text,
  Heading,
  Code,
  Link,
  VStack,
  Button,
  AspectRatio,
  FormControl,
  Stack,
  Input,
  Box,
} from 'native-base'
import { ColorModeSwitch } from '../../components'
interface DataCoin {
  coins: [{
    item: {
      "id": string,
      "coin_id": number,
      "name": string,
      "symbol": string,
      "market_cap_rank": number,
      "thumb": string,
      "small": string,
      "large": string,
      "slug": string,
      "price_btc": number,
      "score": number
    }

  }], exchanges: string[]



}


export function Trending() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
      })

  }, [])
  if (isLoading) return <Center
    flex={1}
    _dark={{ bg: 'blueGray.900' }}
    _light={{ bg: 'blueGray.50' }}
  ><VStack alignItems="center" space="md"><Heading>Loading . . .</Heading></VStack></Center>
  if (!data) return <Heading>ERROR NO DATA</Heading>
  return (
    <Center
      flex={1}
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
    >
      <VStack alignItems="center" space="md">

        <Heading>Trending Cryptos</Heading>

        {
          data.coins.map((element) => {
            return (<Box key={element.item.coin_id}><Avatar bg="green.500" source={{
              uri: element.item.small
            }}>
              {element.item.symbol}
            </Avatar>
              <SolitoLink href={`/coin/${element.item.id}`}>
                <Button pointerEvents="none" variant="outline" colorScheme="coolGray">
                  <Text>{element.item.symbol}</Text>
                </Button>
              </SolitoLink>

            </Box>)
          })
        }


      </VStack>
      <ColorModeSwitch />

    </Center >
  )
}
