import { useAppSelector } from "hooks";
import numeral from "numeral";
import { PortfolioCoinProps } from "PortfolioCoinProps";
import { DisplayPriceChange } from "components";
import {
  Container,
  DataWrapper,
  DataName,
  Title,
  StyledWallet,
  ChangeSincePurchase,
  GainLoss,
  ChangedValueDiv,
  ItemWrapper,
  NumberWrapper,
} from "./AssetData.styles";

type AssetDataProps = Omit<PortfolioCoinProps, "name" | "id">;

function AssetData({
  historyData,
  purchaseAmount,
  purchaseDate,
  marketData,
}: AssetDataProps) {
  const { name: currencyName, symbol: currencySymbol } = useAppSelector(
    (state) => state.settings.activeCurrency
  );
  const { current_price } = marketData[0];
  const {
    [currencyName as keyof typeof historyData.market_data.current_price]:
      past_price,
  } = historyData.market_data.current_price;
  const priceChange = (current_price - past_price) * purchaseAmount;
  const priceChangePercentage =
    (priceChange * 100) / (past_price * purchaseAmount);
  return (
    <Container>
      <Title>
        <div>Asset</div>
        <StyledWallet />
      </Title>

      <DataWrapper>
        <ItemWrapper>
          <DataName>Value</DataName>
          <NumberWrapper>
            {(current_price * purchaseAmount).toString().includes("e")
              ? currencySymbol + "0.0000..."
              : currencySymbol +
                numeral(current_price * purchaseAmount).format("0,0.00[00]")}
          </NumberWrapper>
        </ItemWrapper>

        <ItemWrapper>
          <DataName>Coin Amount</DataName>
          <NumberWrapper>
            {numeral(purchaseAmount).format("0,0.[00000000]")}
          </NumberWrapper>
        </ItemWrapper>

        <ChangeSincePurchase>
          <DataName>Change Since Purchase</DataName>
          <GainLoss>
            <DisplayPriceChange priceChange={priceChangePercentage} />
            <ChangedValueDiv priceChange={priceChange}>
              {currencySymbol +
                numeral(priceChange?.toFixed(3)).format("0,0.000")}
            </ChangedValueDiv>
          </GainLoss>
        </ChangeSincePurchase>

        <ItemWrapper>
          <DataName>Purchase Date</DataName>
          <NumberWrapper>{purchaseDate}</NumberWrapper>
        </ItemWrapper>
      </DataWrapper>
    </Container>
  );
}

export default AssetData;
