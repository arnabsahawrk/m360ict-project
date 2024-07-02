declare module "react-awesome-stars-rating" {
  import * as React from "react";

  interface ReactStarsRatingProps {
    value: number;
    isEdit?: boolean;
    isHalf?: boolean;
    size?: number;
    primaryColor?: string;
    secondaryColor?: string;
    className?: string;
    onChange?: (value: number) => void;
  }

  const ReactStarsRating: React.FC<ReactStarsRatingProps>;

  export default ReactStarsRating;
}
