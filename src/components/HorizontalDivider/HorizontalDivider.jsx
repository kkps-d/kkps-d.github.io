/**
 *
 * @param {{width: string, align: "left" | "center" | "right"}} param0
 */
function HorizontalDivider({ width = "100%", align = "left" }) {
  let style = {};
  switch (align) {
    case "left":
      style = { width, marginLeft: 0 };
      break;
    case "center":
      style = { width };
      break;
    case "right":
      style = { width, marginRight: 0 };
      break;
  }

  return <hr style={style} />;
}

export default HorizontalDivider;
