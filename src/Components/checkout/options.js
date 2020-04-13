import React from "react";

// packages
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import { Container, Col, Row } from "react-bootstrap";

// styles
import "./options.css";

export const Options = (props) => {
  // get prop data
  let deliveryValue = props.deliveryValue;
  let giftValue = props.giftValue;

  // setup value and setter through hooks
  const [value, setValue] = React.useState(deliveryValue);
  const [state, setState] = React.useState({ gift: giftValue });
  const { gift } = state;

  // callbacks
  const handleDeliveryChange = (event) => {
    setValue(event.target.value);
    props.changeDeliveryOption(event.target.value);
  };
  const handleGiftChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.checked });
    props.changeGiftOption(event.target.checked);
  };

  return (
    <Container className="option-wrapper">
      <Row>
        <Col lg={2}></Col>
        <Col lg={4}>
          <div className="option-content">
            <Paper
              elevation={3}
              style={{
                height: "100%",
                borderRadius: "10px",
                backgroundColor: "#F8F8F8",
              }}
            >
              <div className="option-content-wrapper">
                <h5 className="option-header">Delivery</h5>
                <span>
                  Use fast delivery that prioritises your order and ensures you
                  get your package after 24 to 48 hours after your purchase.
                </span>
              </div>
              <div className="option-content-divider" />
              <div className="option-content-bottom-wrapper">
                {/* provide two delivery options */}
                <RadioGroup
                  aria-label="Options"
                  name="delivery"
                  value={value}
                  onChange={handleDeliveryChange}
                >
                  <FormControlLabel
                    value="economy"
                    control={<Radio />}
                    label="Free Economic"
                  />
                  <FormControlLabel
                    value="priority"
                    control={<Radio />}
                    label="Priority £3.99"
                  />
                </RadioGroup>
              </div>
            </Paper>
          </div>
        </Col>
        <Col lg={4}>
          <div className="option-content">
            <Paper
              elevation={3}
              style={{
                height: "100%",
                borderRadius: "10px",
                backgroundColor: "#F8F8F8",
              }}
            >
              <div className="option-content-wrapper">
                <h5 className="option-header">Gift</h5>
                <span>
                  You can send items as gifts when buying selected items. Making
                  purchase as a gift will hide prices on the packing slip.{" "}
                </span>
              </div>
              <div className="option-content-divider" />
              <div className="option-content-bottom-wrapper">
                {/* add gift options */}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gift}
                        onChange={handleGiftChange("gift")}
                        value="gift"
                      />
                    }
                    label="Gift"
                  />
                </FormGroup>
              </div>
            </Paper>
          </div>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </Container>
  );
};

export default Options;
