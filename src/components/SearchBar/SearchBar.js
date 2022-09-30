import { useState } from "react";
import { useGetSearchResultsQuery } from "store/apiSlice";
import {
  Container,
  SearchBarWrapper,
  ResultsWrapper,
  SearchIconContainer,
  SearchIcon,
  Input,
  ResultItemContainer,
  Img,
  StyledLink,
} from "./SearchBar.styles";

function ResultItem({ coinName, imgURL, symbol, id, handleClick }) {
  return (
    <ResultItemContainer>
      <StyledLink to={`/coin/${id}`} onClick={handleClick}>
        <Img src={imgURL} alt={symbol} />
        <div>
          {coinName} ({symbol})
        </div>
      </StyledLink>
    </ResultItemContainer>
  );
}

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { data: searchResults } = useGetSearchResultsQuery(
    inputValue || "random-string-to-avoid-404"
  );

  const handleChange = (e) => setInputValue(e.target.value);
  const handleClick = () => setInputValue("");

  return (
    <Container>
      <SearchBarWrapper>
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
        <Input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleChange}
        />
      </SearchBarWrapper>
      <ResultsWrapper>
        {searchResults &&
          searchResults.map((result) => {
            return (
              <ResultItem
                coinName={result.name}
                imgURL={result.large}
                symbol={result.symbol}
                key={result.id}
                id={result.id}
                handleClick={handleClick}
              />
            );
          })}
      </ResultsWrapper>
    </Container>
  );
}

export default SearchBar;
