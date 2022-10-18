import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterColorsAndPrices } from "../store/Produtcs";

export function Filtros() {
  // States
  const [minValue, setMinValue] = React.useState("");
  const [maxValue, setMaxValue] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState([]);

  //Função que recebe o state e percorre as cores retornando um array com cores únicas
  const getColor = ({ Produtcs }) =>
    Array.from(new Set(Produtcs.data.map(({ color }) => color)));
  const colors = useSelector(getColor);

  // Função que verifica o item checked e adiciona no array e também remove.
  const handleChange = ({ target }) => {
    if (target.checked) {
      setSelectedColor([...selectedColor, target.value]);
    } else {
      setSelectedColor(selectedColor.filter((cor) => cor !== target.value));
    }
  };
  // Função que verifica se um item já começa checked
  const handleChecked = (color) => selectedColor.includes(color);

  const dispatch = useDispatch();

  // Efeito para linkar os dados da Store com os filtros de cores
  React.useEffect(() => {
    dispatch(filterColorsAndPrices({ name: "colors", value: selectedColor }));
  }, [selectedColor, dispatch]);

  // Efeito para ligar os dados da Store com os filtros de valores.
  React.useEffect(() => {
    dispatch(
      filterColorsAndPrices({
        name: "prices",
        value: { min: Number(minValue), max: Number(maxValue) },
      })
    );
  }, [minValue, maxValue, dispatch]);

  return (
    <div>
      <input
        placeholder="Min"
        type="number"
        value={minValue}
        onChange={({ target }) => setMinValue(target.value)}
      />
      <input
        type="number"
        placeholder="Max"
        value={maxValue}
        onChange={({ target }) => setMaxValue(target.value)}
      />
      {colors.map((color) => {
        return (
          <label key={color}>
            <input
              type="checkbox"
              onChange={handleChange}
              checked={handleChecked(color)}
              value={color}
            />
            {color}
          </label>
        );
      })}
    </div>
  );
}
