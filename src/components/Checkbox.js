import React from "react";

export default function Checkbox({ value, ...props }) {
  return <input checked={value} {...props} />;
}
