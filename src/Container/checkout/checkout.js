import React from "react";

import Loading from "../../Components/common/loading";
import BackwardButton from "../../Components/common/buttons/backward_button";
import ForwardButton from "../../Components/common/buttons/forward_button";

import Wrapper from "../../Components/checkout/wrapper";
import Steps from "../../Components/checkout/steps";
import CheckoutCart from "./checkout_cart";
import CheckoutDetails from "./checkout_details";
import CheckoutOptions from "./checkout_options";
import CheckoutConfirm from "./checkout_confirm";

import getCart from "../../api/get_cart";
import getUserAccount from "../../api/get_user_account";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      emptyCart: false,
      tokenPresent: true,
      index: 0,
      maxIndex: null
    };
  }

  async getData(token) {
    const cartData = await getCart(token);
    const detailsData = await getUserAccount(token);

    if (cartData != null || detailsData != null) {
      // if (true) {
      if (cartData.cart.length >= 1) {
        this.initSections(cartData.cart, detailsData);
      } else {
        this.setState({ emptyCart: true, loading: false });
      }
    }
  }

  initSections(cartData, detailsData) {
    let total = this.getTotal(cartData);

    let sectionList = [
      <CheckoutCart total={total} data={cartData} />,
      <CheckoutDetails data={detailsData} />,
      <CheckoutOptions />,
      <CheckoutConfirm
        cartData={cartData}
        total={total}
        detailsData={detailsData}
      />
    ];

    this.setState({
      loading: false,
      sectionList: sectionList,
      maxIndex: sectionList.length - 1
    });
  }

  getTotal(data) {
    let total = 0;
    console.log("data in chkout: " + data);
    data.map(
      obj =>
        (total +=
          obj.discount_subtotal == null
            ? obj.price_subtotal
            : obj.discount_subtotal)
    );
    return total;
  }

  incrementSection = num => {
    let i = this.state.index;
    let l = this.state.maxIndex;

    if (num === 1 || num == null) {
      this.setState({ index: i >= l ? l : i + 1 });
    } else if (num === -1) {
      this.setState({ index: i <= 0 ? 0 : i - 1 });
    }
  };

  async componentDidMount() {
    const token = await this.props.getToken();

    if (token !== null) {
      this.getData(token);
    } else {
      this.setState({ tokenPresent: false, loading: false });
    }
  }

  components() {
    return (
      <Wrapper
        // #TODO fix back button the first checkout section
        steps={<Steps index={this.state.index} />}
        section={this.state.sectionList[this.state.index]}
        backwardButton={
          <BackwardButton script={() => this.incrementSection(-1)} />
        }
        forwardButton={<ForwardButton script={() => this.incrementSection()} />}
      />
    );
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      if (!this.state.tokenPresent) {
        return <h1>Log in</h1>;
      } else if (this.state.emptyCart) {
        return <h1>Empty cart</h1>;
      } else {
        return this.components();
      }
    }
  }
}
