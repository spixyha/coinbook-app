import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { changeCurrency } from "store/settingsSlice";
import { UpGreenCaret, DownGreenCaret } from "styles";
import {
  DropdownItemContainer,
  SelectedWrapper,
  Img,
  DropdownWrapper,
  CurrencyWrapper,
} from "./CurrencyToggler.styles";

function DropdownItem({
  currency = "",
  symbol = "",
  handleClick = () => null,
}: {
  currency: string;
  symbol: string;
  handleClick(currency: string): void;
}) {
  return (
    <DropdownItemContainer onClick={() => handleClick(currency)}>
      <Img src={symbol} alt={`${currency} symbol`} />
      <div>{currency.toUpperCase()}</div>
    </DropdownItemContainer>
  );
}

function CurrencyToggler() {
  const dispatch = useAppDispatch();
  const { name, iconURL } = useAppSelector(
    (state) => state.settings.activeCurrency
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const currencies = [
    {
      name: "usd",
      symbol: "$",
      iconURL: "https://i.ibb.co/YkKkc6J/dollar-icon.png",
    },
    {
      name: "eur",
      symbol: "€",
      iconURL: "https://i.ibb.co/tP0n42j/euro-icon.png",
    },
    {
      name: "gbp",
      symbol: "£",
      iconURL: "https://i.ibb.co/cNSyGZP/pound-icon.png",
    },
    {
      name: "btc",
      symbol: "₿",
      iconURL: "https://i.ibb.co/PWh7SxB/btc32px.png",
    },
    {
      name: "eth",
      symbol: "Ξ",
      iconURL: "https://i.ibb.co/QDXPJfV/eth32px.png",
    },
  ];

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSelect = (selectedCurrency: string) => {
    const activeCurrency = currencies.find(
      (currency) => currency.name === selectedCurrency
    );
    setIsExpanded(false);
    dispatch(changeCurrency(activeCurrency!));
  };

  return (
    <CurrencyWrapper>
      <SelectedWrapper onClick={handleClick}>
        <Img src={iconURL} alt={`${name} symbol`} />
        <div>{name.toUpperCase()}</div>
        {isExpanded ? <UpGreenCaret /> : <DownGreenCaret />}
      </SelectedWrapper>
      <DropdownWrapper>
        {isExpanded &&
          currencies.map((currency) => {
            return (
              <DropdownItem
                key={currency.name}
                symbol={currency.iconURL}
                currency={currency.name}
                handleClick={handleSelect}
              />
            );
          })}
      </DropdownWrapper>
    </CurrencyWrapper>
  );
}

export default CurrencyToggler;
