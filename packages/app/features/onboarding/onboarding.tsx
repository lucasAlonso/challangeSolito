//import { Image } from 'react-native';
import React from 'react';
import { Image } from 'native-base'
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'solito/router'

export function Onboard() {

    const { replace } = useRouter();
    return (<Onboarding
        onDone={() => replace('/trending')}
        pages={[
            {
                backgroundColor: '#fff',
                image: <Image source={require('./images/circle.png')} />,
                title: 'Welcome',
                subtitle: 'start learning about crypto',
            },
            {
                backgroundColor: '#fe6e58',
                image: <Image source={require('./images/square.png')} />,
                title: 'Push your limits',
                subtitle: 'Level Up your crypto-widsdom',
            },
            {
                backgroundColor: '#999',
                image: <Image source={require('./images/triangle.png')} />,
                title: 'Share',
                subtitle: "buy a birra for the boys",
            },
        ]}
    />)
}

