import { createParam } from 'solito'
import { Link as SolitoLink } from 'solito/link'
import React, { useEffect, useState } from 'react'
import { Center, Heading, Button, Box, ChevronLeftIcon, VStack } from 'native-base'
import { ColorModeSwitch } from '../../components'

const { useParam } = createParam<{ id: string }>()

export function CoinDetailScreen() {
  const [id] = useParam('id')
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
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
      flex="1"
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
    >
      <Heading>{`Hey there! this would be  detail of ${id} 👋`}</Heading>
      <Box mt="6">
        <SolitoLink href="/trending">
          <Button
            pointerEvents="none"
            leftIcon={<ChevronLeftIcon size="xs" />}
            variant="outline"
            colorScheme="coolGray"
          >
            Go Back
          </Button>
        </SolitoLink>
      </Box>
      <ColorModeSwitch />
    </Center>
  )
}
