import React, { useState } from "react";
import styled from "styled-components/macro";
import TextBox from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";

const Home = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const searchValueChanged = (e) => {
    setSearchValue(e.value);
  };

  const searchProduct = async (e) => {
    if (searchValue !== "") {
      //   await sendCustomers({ nome: customerName, pais: selectedCountry });
      //   gridCustomers.current.instance.refresh();
      //   setSearchValue("");
    }
  };

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

  return (
    <React.Fragment>
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
      </Container>
    </React.Fragment>
  );
};

export default Home;
