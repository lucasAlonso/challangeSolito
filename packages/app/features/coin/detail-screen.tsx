import { createParam } from 'solito'
import { Link as SolitoLink } from 'solito/link'
import React, { useEffect, useState } from 'react'
import { Center, Heading, Button, Box, ChevronLeftIcon, Text, HStack, Spinner, View } from 'native-base'
import { ColorModeSwitch } from '../../components'
import { BarChart, ProgressCircle, Grid } from 'react-native-svg-charts'
import { CoinsFetchData } from 'app/components/coinGeckoTypes'
import { useIsMobileWeb } from 'app/hooks/use-is-mobile-web';
const { useParam } = createParam<{ id: string }>()
import { CoinDetailComp } from 'app/components/CoinDetailComponent'

export function CoinDetailScreen({ dataRes }) {
  const [id] = useParam('id');
  const [data, setData] = useState<CoinsFetchData | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })

  }, [])

  if (!dataRes) {

    if (isLoading) return <Center flex="1"><HStack space={2} justifyContent="center">
      <Spinner size="lg" accessibilityLabel="Loading Info" />
    </HStack></Center>;
    if (!data) return <Heading>ERROR NO DATA</Heading>
    return (<CoinDetailComp data={data} />
    )
  } else {
    return (
      <CoinDetailComp data={dataRes} />
    )

  }
}
