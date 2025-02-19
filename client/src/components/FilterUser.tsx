import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { filterAndSort } from "../redux/actions/public/postsActions";
import Switcher from "./Switcher";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
`;

const Types = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 15%;
`;

const TypeTitle = styled.div`
  font-family: ${(p) => p.theme.colors.typography.poppins};
  font-size: 1vw;
  font-weight: bold;
  margin-bottom: 5%;
  color: #ef5da8;
`;

const Option = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Select = styled.select`
  border: 0.5px solid grey;
  padding: 0.5vw;
  border-radius: 10px;
  color: grey;
`;
const H2 = styled.h2`
  font-family: ${(p) => p.theme.colors.typography.poppins};
  font-size: 1.3vw;
  color: grey;
  font-weight: 500;
`;

const Label = styled.label`
  color: grey;
  font-family: ${(p) => p.theme.colors.typography.poppins};
`;

const OptionSelect = styled.option`
  color: grey;
  font-family: ${(p) => p.theme.colors.typography.poppins};
  font-size: 1vw;
`;

interface Filters {
  inputName: string;
  categories: string[];
  score: string;
  orderBy: string;
  location: {
    city: string[];
  };
  modality: {
    onSite: boolean;
    hybrid: boolean;
    remote: boolean;
  };
  contractType: {
    fullTime: boolean;
    partTime: boolean;
    temporary: boolean;
    perHour: boolean;
  };
}

const FilterUser: FC = () => {
  const filter = useSelector(
    (state: any) => state.postsReducer.filters_and_sort
  );
  const dispatch = useDispatch();

  const handleFilter = (id: string, name: string, checked: boolean) => {
    if (id === "location") {
      return dispatch(
        filterAndSort({
          ...filter,
          location: {
            ...filter.location,
            city: filter.location.city.filter((elem: any) => elem !== name),
          },
        })
      );
    }

    if (id === "inputNames") {
      return dispatch(
        filterAndSort({
          ...filter,
          inputNames: filter.inputNames.filter((elem: any) => elem !== name),
        })
      );
    }

    dispatch(
      filterAndSort({ ...filter, [id]: { ...filter[id], [name]: checked } })
    );
  };
  const handleScore = ({ target: { value } }: any) => {
    dispatch(filterAndSort({ ...filter, score: value }));
  };

  return (
    <FilterContainer>
      <H2>Filtros</H2>
      <Types>
        <TypeTitle>Puntuación de Empresa</TypeTitle>
        <Option>
          <Label htmlFor="score">Puntuación</Label>
          <Select onChange={(e) => handleScore(e)}>
            <OptionSelect value="">Todos</OptionSelect>
            <OptionSelect value="5">5★</OptionSelect>
            <OptionSelect value="4">4★</OptionSelect>
            <OptionSelect value="3">3★</OptionSelect>
            <OptionSelect value="2">2★</OptionSelect>
            <OptionSelect value="1">1★</OptionSelect>
          </Select>
        </Option>
      </Types>
      {filter.inputNames.length > 0 && (
        <Types>
          <TypeTitle>Puestos buscados</TypeTitle>
          {filter.inputNames.map((e: string, index: number) => (
            <Option key={index}>
              <Label htmlFor={`inputNames${index}`}>{e}</Label>
              <Switcher
                checkedProp={true}
                id="inputNames"
                name={e}
                handleFilter={handleFilter}
              />
            </Option>
          ))}
        </Types>
      )}
      {filter.location.city.length > 0 && (
        <Types>
          <TypeTitle>Ubicación</TypeTitle>
          {filter.location.city.map((city: string, index: number) => (
            <Option key={index}>
              <Label htmlFor={`location${index}`}>{city}</Label>
              <Switcher
                checkedProp={true}
                id="location"
                name={city}
                handleFilter={handleFilter}
              />
            </Option>
          ))}
        </Types>
      )}
      <Types>
        <TypeTitle>Modalidad</TypeTitle>
        <Option>
          <Label htmlFor="presencial">Presencial</Label>
          <Switcher id="modality" name="onSite" handleFilter={handleFilter} />
        </Option>
        <Option>
          <Label htmlFor="remota">Remota</Label>
          <Switcher id="modality" name="remote" handleFilter={handleFilter} />
        </Option>
        <Option>
          <Label htmlFor="hibrida">Híbrida</Label>
          <Switcher id="modality" name="hybrid" handleFilter={handleFilter} />
        </Option>
      </Types>
      <Types>
        <TypeTitle>Tipo de contrato</TypeTitle>
        <Option>
          <Label htmlFor="fullTime">Full Time</Label>
          <Switcher
            id="contractType"
            name="fullTime"
            handleFilter={handleFilter}
          />
        </Option>
        <Option>
          <Label htmlFor="partTime">Part Time</Label>
          <Switcher
            id="contractType"
            name="partTime"
            handleFilter={handleFilter}
          />
        </Option>
        <Option>
          <Label htmlFor="temporary">Temporal</Label>
          <Switcher
            id="contractType"
            name="temporary"
            handleFilter={handleFilter}
          />
        </Option>
        <Option>
          <Label htmlFor="perHour">por Hora</Label>
          <Switcher
            id="contractType"
            name="perHour"
            handleFilter={handleFilter}
          />
        </Option>
      </Types>
    </FilterContainer>
  );
};

export default FilterUser;
