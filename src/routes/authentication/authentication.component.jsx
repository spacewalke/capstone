import SighUpForm from "../../components/sigh-up-form/sigh-up-form.component";
import SighInForm from "../../components/sigh-in-form/sigh-in-form.component";

import "./authentication.style.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SighInForm />
      <SighUpForm />
    </div>
  );
};

export default Authentication;
