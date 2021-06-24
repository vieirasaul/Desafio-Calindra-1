import React, { useState } from "react";
import styled from "styled-components/macro";
import { Autocomplete } from "devextreme-react/autocomplete";
import { Button } from "devextreme-react/button";
import { LoadPanel } from "devextreme-react/load-panel";
import { getProducts, getSuggestions } from "../../services/searchService";
import CustomStore from "devextreme/data/custom_store";

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-top: 20px;
  .dx-button {
    margin-left: 20px;
  }
`;

const StyledList = styled.ul`
  margin-top: 10px;
`;

const Home = (props) => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loadPanelVisible, setLoadPanelVisible] = useState(false);
  const [hasSearched, sethasSearched] = useState(false);

  const searchValueChanged = (e) => {
    setSearchValue(e.value);
  };

  const autoCompleteSource = new CustomStore({
    load: () => {
      if (searchValue !== "") {
        return getSuggestions(searchValue);
      }
    },
  });

  const autoCompleteItemClick = async (e) => {
    setLoadPanelVisible(true);
    const data = await getProducts(e.itemData.term);
    setLoadPanelVisible(false);
    setSearchResults(data);
    sethasSearched(true);
  };

  const searchProduct = async (e) => {
    if (searchValue !== "") {
      setLoadPanelVisible(true);
      const data = await getProducts(searchValue);
      setLoadPanelVisible(false);
      setSearchResults(data);
      sethasSearched(true);
    }
  };

  const productsList = searchResults.map(({ id, name }) => (
    <li key={id}>
      <p>{name}</p>
    </li>
  ));

  return (
    <React.Fragment>
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        visible={loadPanelVisible}
        message="Carregando..."
      />
      <Container>
        <SearchContainer>
          <Autocomplete
            dataSource={autoCompleteSource}
            valueExpr="term"
            showClearButton={true}
            defaultValue={searchValue}
            onValueChanged={searchValueChanged}
            minSearchLength={3}
            onItemClick={autoCompleteItemClick}
            width={250}
            placeholder="Digite um produto..."
          />
          <Button
            text="Pesquisar"
            type="default"
            stylingMode="contained"
            onClick={searchProduct}
          />
        </SearchContainer>
        <StyledList>
          {searchResults.length > 0 || !hasSearched ? (
            productsList
          ) : (
            <p>Não foram encontrados produtos com a palavra "{searchValue}".</p>
          )}
        </StyledList>
      </Container>
    </React.Fragment>
  );
};

export default Home;
