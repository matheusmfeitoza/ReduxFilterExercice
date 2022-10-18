import React from "react";
import { useSelector } from "react-redux";

export function Produtos() {
  // Function que retorna o filtro de cores. Este filtro não modifica o state, apenas realiza o filtro.
  const filterColors = (colors) => (product) =>
    !colors.length || colors.includes(product.color);

  const filterPrices = (prices) => (product) =>
    (!prices.max || prices.max >= product.price) &&
    (!prices.min || prices.min <= product.price);

  const filterProducts = ({ Produtcs }) => {
    const { data, filters } = Produtcs;
    return data
      .filter(filterColors(filters.colors))
      .filter(filterPrices(filters.prices));
  };

  const data = useSelector(filterProducts);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Cor</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ id, name, color, price }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{color}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
