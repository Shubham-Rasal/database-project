import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";

export function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <h1>You have received a reward 🎁🎉🥳 !!!</h1>
    </Html>
  );
}

export default Email;
