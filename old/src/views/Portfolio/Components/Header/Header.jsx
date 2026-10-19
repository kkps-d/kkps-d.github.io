import HorizontalDivider from "../../../../components/HorizontalDivider/HorizontalDivider";

function Header() {
  return (
    <>
      <h1>portfolio</h1>
      <p className="lighter-text">
        Here's what I did over the years! click them for details
      </p>
      <HorizontalDivider width={"100px"} align="center" />
    </>
  );
}

export default Header;
