import { Link as SolitoLink } from 'solito/link'
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'solito/router'
import { useIsMobileWeb } from "../../hooks/use-is-mobile-web";
import { SvgComponent } from './greenerlogo'

import {
  Center,
  Image,
  Heading,
  VStack,
  Button,
  FormControl,
  Input,
  Box,
} from 'native-base'
import { ColorModeSwitch } from '../../components'


type Inputs = {
  email: string,
  password: string,
};


export function HomeScreen() {

  const { replace } = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { isMobileWeb } = useIsMobileWeb();
  const onSubmit: SubmitHandler<Inputs> = data => { isMobileWeb ? replace('/onboard') : replace('/trending'); }

  return (
    <Center
      flex={1}
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
    >
      <VStack alignItems="center" space="md">
        <Center>
          <SvgComponent></SvgComponent>
        </Center>
        <Heading>LOGIN</Heading>
      </VStack>
      <ColorModeSwitch />

      <Box mt="6">
        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  placeholder="usuario@mail.com"
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="email"
              rules={{
                required: 'Field is required', minLength: 3, pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage _text={{
              fontSize: 'xs'
            }}>
              Check email format
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onBlur={onBlur}
                  type="password"
                  onChangeText={(val) => onChange(val)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: 'Field is required', minLength: 3, maxLength: 8 }}
              defaultValue=""
            />

            <FormControl.ErrorMessage _text={{
              fontSize: 'xs'
            }}>
              Password should contain between 3 and 8 characters.
            </FormControl.ErrorMessage>
          </FormControl>

          <Button onPress={handleSubmit(onSubmit)} mt="2" colorScheme="indigo">
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}
