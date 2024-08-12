import { DOMAttributes, MouseEvent, useState } from "react";
import { cn } from "../lib/utils";
import { cva } from "class-variance-authority";
import { Cog6ToothIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const settingsVariants = cva(["w-8", "cursor-pointer"], {
  variants: {
    active: {
      true: "fill-purple-600",
      false: "fill-gray-400",
    },
  },
  defaultVariants: {
    active: false,
  },
});
export const SettingsButton = ({
  active,
  ...rest
}: { active: boolean } & DOMAttributes<SVGSVGElement>) => {
  return (
    <Cog6ToothIcon className={cn(settingsVariants({ active }))} {...rest} />
  );
};

export const ResetButton = (props: DOMAttributes<SVGSVGElement>) => {
  const [wasClicked, setWasClicked] = useState(false);

  const onClickInner = (event: MouseEvent<SVGSVGElement>) => {
    const { onClick } = props;
    setWasClicked(true);
    setTimeout(() => {
      setWasClicked(false);
    }, 500);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ArrowPathIcon
      className={`cursor-pointer w-8 ${wasClicked ? "animate-spin" : ""}`}
      {...props}
      onClick={onClickInner}
    />
  );
};
