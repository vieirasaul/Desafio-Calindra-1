import React, { useState } from "react";
import styled from "styled-components/macro";
import TextBox from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";
import { LoadPanel } from "devextreme-react/load-panel";
import { getProducts } from "../../services/searchService";

const Home = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadPanelVisible, setLoadPanelVisible] = useState(false);

  const searchValueChanged = (e) => {
    setSearchValue(e.value);
  };

  const searchProduct = async (e) => {
    if (searchValue !== "") {
      setLoadPanelVisible(true);
      const data = await getProducts(searchValue);
      setLoadPanelVisible(false);
      setSearchResults(data.products);
    }
  };

  const productsList = searchResults.map(({ id, name }) => (
    <li key={id}>
      <p>{name}</p>
    </li>
  ));

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
    list-style-type: none;
  `;

  return (
    <React.Fragment>
      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        visible={loadPanelVisible}
        message="Carregando..."
      />
      <Container>
        <SearchContainer>
          <TextBox
            value={searchValue}
            onValueChanged={searchValueChanged}
            width={250}
          />
          <Button
            text="Pesquisar"
            type="default"
            stylingMode="contained"
            onClick={searchProduct}
          />
        </SearchContainer>
        <StyledList>{productsList}</StyledList>
      </Container>
    </React.Fragment>
  );
};

export default Home;
