import React, { useEffect, useState } from 'react'
import { Link as SolitoLink } from 'solito/link'
import { useRouter } from 'solito/router'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from 'app/components/firebase';
import { useIsMobileWeb } from 'app/hooks/use-is-mobile-web';

import {
  Avatar,
  Center,
  HStack,
  Text,
  Heading,
  Spinner,
  VStack,
  Flex,
  Divider,
  Box,
  ScrollView,
} from 'native-base'
import { ColorModeSwitch } from '../../components'
import { LogOut } from '../../components/LogOut'


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

/**
 * Trendind Component
 * @param dataRes in case of SSR, check apps/next/pages/trending/index.tsx for more detail 
 * 
 */

export function Trending({ dataRes }) {
  const [data, setData] = useState<DataCoin | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { replace } = useRouter();
  const { isMobileWeb } = useIsMobileWeb();

  onAuthStateChanged(auth, (user) => {
    if (!user) { replace('/home') }
  });

  useEffect(() => {
    setLoading(true)
    console.log(isMobileWeb)
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((res) => res.json())
      .then((data) => {
        console.log("client")
        setData(data)
        setLoading(false);
      })

  }, [])

  if (!dataRes) {
    if (isLoading) return <Center flex="1"><HStack space={2} justifyContent="center">
      <Spinner size="lg" accessibilityLabel="Loading Info" />
    </HStack></Center>;
    if (!data) return <Text>No Data</Text>
  }

  if (isMobileWeb) {
    return (
      <Center
        flex={1}
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
      >
        <ScrollView>
          <VStack alignItems="center" space="md">

            <Heading>Trending Cryptos</Heading>

            {
              data?.coins.map((element) => {
                console.log("Client Side Rendering")
                //Todo remove console log
                return (
                  <SolitoLink key={element.item.coin_id} href={`/coin/${element.item.id}`}>
                    <Box alignItems="center" shadow="4" p="5" m="2" borderRadius="md">
                      <Box w="160">
                        <Heading size="md" mx="auto">{element.item.name}</Heading>
                        <Divider my="2" />
                        <Flex mx="3" direction="row" justify="space-evenly" h="60">
                          <Avatar bg="green.500" source={{ uri: element.item.small }}></Avatar>
                          <Divider orientation="vertical" mx="3" />
                          <Heading size="md" py="2">{element.item.symbol}</Heading>
                        </Flex>
                      </Box>
                    </Box>
                  </SolitoLink>
                )
              })
            }


          </VStack>
        </ScrollView>
        <ColorModeSwitch />
        <LogOut />
      </Center >
    )
  }
  else {
    return (
      <Center
        flex={1}
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
      >
        <ScrollView>
          <VStack alignItems="center" space="md">

            <Heading>Trending Cryptos</Heading>

            {
              dataRes?.coins.map((element) => {
                console.log("server Side Rendering")
                //Todo remove console log
                return (
                  <SolitoLink key={element.item.coin_id} href={`/coin/${element.item.id}`}>
                    <Box alignItems="center" shadow="4" p="5" m="2" borderRadius="md">
                      <Box w="160">
                        <Heading size="md" mx="auto">{element.item.name}</Heading>
                        <Divider my="2" />
                        <Flex mx="3" direction="row" justify="space-evenly" h="60">
                          <Avatar bg="green.500" source={{ uri: element.item.small }}></Avatar>
                          <Divider orientation="vertical" mx="3" />
                          <Heading size="md" py="2">{element.item.symbol}</Heading>
                        </Flex>
                      </Box>
                    </Box>
                  </SolitoLink>
                )
              })
            }


          </VStack>
        </ScrollView>
        <ColorModeSwitch />
        <LogOut />
      </Center >
    )
  }
}
