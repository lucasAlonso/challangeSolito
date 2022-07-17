import { Trending } from 'app/features/trending/trending-screen'
import { GetServerSideProps } from 'next';
export default Trending
interface DataCoin {
    coins: [{
        item: {
            "id": string,
            "coin_id": number,
            "name": string,
            "symbol": string,
            "market_cap_rank": number,
            "thumb": string,
            "small": string,
            "large": string,
            "slug": string,
            "price_btc": number,
            "score": number
        }

    }], exchanges: string[]
}
export const getServerSideProps: GetServerSideProps = async ({
    params,
    res
}) => {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const dataRes: DataCoin = await res.json();

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