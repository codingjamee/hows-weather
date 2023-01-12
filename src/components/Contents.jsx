import Map from "./Map";
import Weather from "./Weather";

import classes from "./Contents.module.css";

const Container = () => {
  return (
    <article className={classes.contents}>
      <Weather />
      <Map />
    </article>
  );
};
export default Container;
