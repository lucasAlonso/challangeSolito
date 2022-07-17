import { CoinDetailScreen } from 'app/features/coin/detail-screen'
import { CoinsFetchData } from '../../../../packages/app/components/coinGeckoTypes'
import { GetServerSideProps } from 'next';

export default CoinDetailScreen

export const getServerSideProps: GetServerSideProps = async ({
    params,
    res
}) => {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`);
        const dataRes: CoinsFetchData = await res.json();

        return {
            props: { dataRes }
        };
    } catch {
        res.statusCode = 404;
        return {
            props: {}
        };
    }
};