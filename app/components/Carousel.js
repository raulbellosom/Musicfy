import React from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

export default function CarouselImages(props) {
  const { arrayImages, height, width } = props;
  const newWidth = width - 10;
  const renderItem = ({ item }) => {
    return <Image containerStyle={{ width, height }} source={{ uri: item }} />;
  };

  return (
    <Carousel
      layout={"default"}
      // layoutCardOffset={20}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}
