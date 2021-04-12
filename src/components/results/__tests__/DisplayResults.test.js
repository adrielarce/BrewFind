import { shallow } from "enzyme";
import DisplayResults from "../DisplayResults";

const breweries = [
  {
    name: "brewery 1",
    street: "123 brew ave",
  },
  {
      name: "brewery 2",
      streeet: "456 brew st",
  },
];

const wrapper = shallow(<DisplayResults breweries={breweries} />);
