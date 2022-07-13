import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { CoinDetailScreen } from '../../features/coin/detail-screen'
import { Trending } from 'app/features/trending/trending-screen';
import { Onboard } from '../../features/onboarding/onboarding'

const Stack = createNativeStackNavigator<{
  home: undefined
  'coin-detail': {
    id: string
  }
  login: undefined
  trending: undefined
  onboard: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="coin-detail"
        component={CoinDetailScreen}
        options={{
          title: 'Coin',
        }}
      />
      <Stack.Screen
        name="trending"
        component={Trending}
        options={{
          title: 'Trending',
        }}
      />
      <Stack.Screen
        name="onboard"
        component={Onboard}
        options={{
          title: 'Onboard',
        }}
      />
    </Stack.Navigator>
  )
}
