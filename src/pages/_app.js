import '../../styles/globals.css'
import { SignerProvider } from '../state/ConnectSate'

function MyApp({ Component, pageProps }) {
  return(
      <SignerProvider>
          <Component {...pageProps}  />
      </SignerProvider>
  )

}

export default MyApp
