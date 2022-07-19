import { createParam } from 'solito'
import React, { useEffect, useState } from 'react'
import { Center, Heading, HStack, Spinner } from 'native-base'
import { CoinsFetchData } from 'app/components/coinGeckoTypes'
import { CoinDetailComp } from 'app/components/CoinDetailComponent'
const { useParam } = createParam<{ id: string }>()

/**
 * CoinDetailScreen Component
 *
 */

export function CoinDetailScreen({
  dataRes,
}: {
  dataRes: CoinsFetchData
}): JSX.Element {
  const [id] = useParam('id')
  const [data, setData] = useState<CoinsFetchData | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data: CoinsFetchData) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (!dataRes) {
    if (isLoading)
      return (
        <Center flex="1">
          <HStack space={2} justifyContent="center">
            <Spinner size="lg" accessibilityLabel="Loading Info" />
          </HStack>
        </Center>
      )
    if (!data) return <Heading>ERROR NO DATA</Heading>
    return <CoinDetailComp data={data} />
  } else {
    return <CoinDetailComp data={dataRes} />
  }
}
