import { FC } from "react";
import ResponsiveAppBar from "./AppBar";

interface IBaseHeader {}

const BaseHeader: FC<IBaseHeader> = () => {
  return  <ResponsiveAppBar />
}

export default BaseHeader