import type { NextPage } from 'next'
import { Index } from 'src/view/index'
import Layout from 'src/layout'

const Home: NextPage<any> = () => {
  return (
    <Layout TDK={{ title: 'Hipo NFT,NFT Marketplace on GateChain' }} maxWidth={false} sx={{ padding: '0 !important' }} showFooter={true}>
      <Index />
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    return {
      props: {}
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}

export default Home
