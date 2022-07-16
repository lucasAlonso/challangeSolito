import { Link as SolitoLink } from 'solito/link'
import { useRouter } from 'solito/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from 'app/hooks/useAuthContext'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from 'app/components/firebase';
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


export function Trending() {

  const { idToken, setIdToken } = useAuth();
  const [data: DataCoin, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { replace } = useRouter();


  onAuthStateChanged(auth, (user) => {
    if (!user) { replace('/home') }
  });
  useEffect(() => {
    setLoading(true)
    fetch('https://api.coingecko.com/api/v3/search/trending')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })

  }, [])

  if (isLoading) return <Center flex="1"><HStack space={2} justifyContent="center">
    <Spinner size="lg" accessibilityLabel="Loading Info" />
  </HStack></Center>;
  if (!data) return <Heading>ERROR NO DATA</Heading>
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
            data.coins.map((element) => {
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
