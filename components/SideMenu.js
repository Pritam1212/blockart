import { Grid, Menu, Segment } from "semantic-ui-react";

const SideMenu = (props) => {
  const clickHandler = () => {
    console.log("skgjh");
  };
  return (
    <Grid style={{ margin: "10px -90px 0px 90px" }}>
      <Grid.Column width={2}>
        <Menu
          fluid
          pointing
          vertical
          inverted
          style={{ backgroundColor: "var(--primary)" }}
        >
          <Menu.Item
            name="bio"
            // active={activeItem === "bio"}
            // onClick={this.handleItemClick}
          />
          <Menu.Item
            name="pics"
            // active={activeItem === "pics"}
            // onClick={this.handleItemClick}
          />
          <Menu.Item name="companies" active onClick={clickHandler} />
          <Menu.Item
            name="links"
            // active={activeItem === "links"}
            // onClick={this.handleItemClick}
          />
        </Menu>
      </Grid.Column>

      <Grid.Column stretched width={10}>
        <Segment
          style={{
            backgroundColor: "var(--secondary)",
            border: "none",
            boxShadow: "none",
          }}
        >
          {props.children}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default SideMenu;
