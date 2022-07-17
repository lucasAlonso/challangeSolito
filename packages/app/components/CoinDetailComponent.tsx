import React from "react"
import { Center, Heading, Button, Box, ChevronLeftIcon, Text, HStack, Spinner, View } from 'native-base'
import { BarChart, ProgressCircle, Grid } from 'react-native-svg-charts'
import { createParam } from 'solito'
import { Link as SolitoLink } from 'solito/link'
import { ColorModeSwitch } from './ColorModeSwitch'

export function CoinDetailComp({ data }) {
    const fill = 'rgb(134, 65, 244)'
    const chartData = [data.market_data.price_change_percentage_24h, data.market_data.price_change_percentage_7d, data.market_data.price_change_percentage_14d, data.market_data.price_change_percentage_30d, data.market_data.price_change_percentage_60d]
    return (
        <Center
            flex="1"
            _dark={{ bg: 'blueGray.900' }}
            _light={{ bg: 'blueGray.50' }}
        >
            <Heading>{`${data.name} - ${data.symbol}`}</Heading>
            <Text fontSize="lg">Price: {data.market_data.current_price.usd} USD</Text>
            <Text fontSize="lg">Market Cap: {data.market_data.market_cap.usd} USD</Text>

            <View style={{ height: 600, width: 300, padding: 20 }}>
                <Center><Heading size="md">Variation Percentage</Heading></Center>
                <BarChart style={{ height: 200 }} data={chartData} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                    <Grid />
                </BarChart>
                <Center m="2" p="5" ><Heading size="md">Market Cap Change Percentage 24h</Heading></Center>
                <ProgressCircle style={{ height: 200 }} progress={data.market_data.market_cap_change_percentage_24h / 100} progressColor={'rgb(134, 65, 244)'} />
            </View>

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