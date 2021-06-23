import axios from "axios";

export async function getProducts(product) {
  const response = await axios.get(
    "https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=" +
      product +
      "&source=nanook"
  );

  if (response.status >= 200 && response.status <= 299) {
    return response.data;
  } else {
    return new Error(
      "Não foi possível carregar os produtos. Código do erro: " +
        response.status
    );
  }
}
