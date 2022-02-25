import { lighten } from "polished";

export const theme = {
  pallete: {
    primary: {
      main: "#7159c1",
      get light() {
        return lighten(0.1, this.main);
      },
      get dark() {
        return lighten(-0.1, this.main);
      },
      contrastText: "#FFF",
    },
  },
};
