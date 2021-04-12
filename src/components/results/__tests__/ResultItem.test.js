import { shallow } from "enzyme";
import ResultItem from "../ResultItem";

const brewery = {
  name: "brewery 1",
  street: "123 brew ave",
  city: "Chicago",
  state: "illinois",
  postal_code: "123 987",
  brewery_type: "micro"
};

const wrapper = shallow(<ResultItem brewery={brewery} />);
