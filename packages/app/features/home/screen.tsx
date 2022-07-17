import { Link as SolitoLink } from 'solito/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useRouter } from 'solito/router'
import { useIsMobileWeb } from "../../hooks/use-is-mobile-web";
import { SvgComponent } from './greenerlogo'

import { auth } from "../../components/firebase"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import {
  Center,
  Image,
  Heading,
  VStack,
  Button,
  FormControl,
  Input,
  Box,
  HStack,
  Alert,
  Text,
  IconButton,
  CloseIcon,
  Collapse
} from 'native-base'
import { ColorModeSwitch } from '../../components'



type Inputs = {
  email: string,
  password: string,
};

/**
 * Home Component
 *  
 */

export function HomeScreen() {

  const { replace } = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const { isMobileWeb } = useIsMobileWeb();
  const [hasLoginError, setHasLoginError] = useState<string | boolean>(false)

  const onSubmit: SubmitHandler<Inputs> = data => {

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        isMobileWeb ? replace('/onboard') : replace('/trending');
      })
      .catch(error => {
        if (error.code = 'auth/user-not-found') {
          setHasLoginError("Bad login credentials, please try again")

        }
        console.log(error.message)
        console.log(error.code)

      });
  }

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
            <HStack space={2} flexShrink={1}>

            </HStack>
          </FormControl>
          <Collapse isOpen={hasLoginError !== false}>
            <Alert w="100%" status={"error"}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {hasLoginError}
                    </Text>
                  </HStack>
                  <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                  }} icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setHasLoginError(false)} />
                </HStack>
              </VStack>
            </Alert>
          </Collapse>
          <Button onPress={handleSubmit(onSubmit)} mt="2" colorScheme="indigo">
            Sign in
          </Button>
        </VStack>
      </Box>
    </Center>
  )
}



