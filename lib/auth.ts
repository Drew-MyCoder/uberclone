import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { TokenCache } from '@clerk/clerk-expo/dist/cache'

// async function testSecureStore() {
//   try {
//     await SecureStore.setItemAsync('test_key', 'test_value');
//     const value = await SecureStore.getItemAsync('test_key');
//     console.log('Retrieved from SecureStore:', value);
//   } catch (error) {
//     console.error('SecureStore error:', error);
//   }
// }

// testSecureStore();

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('secure store get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token)
    },
  }
}

// SecureStore is not supported on the web
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined