import React, { useEffect, useState } from "react";
import { Pagination } from "@shopify/polaris";
import "./styles.scss";

export function CustomPagination({
  totalAmount = 0,
  currentIndex = 0,
  onChangePagination = () => {},
  step = 5
}) {
  const [hasPrevious, setHasPrevious] = useState(true)
  const [hasNext, setHasNext] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if(totalAmount <= step) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [totalAmount])

  useEffect(() => {
    if(currentIndex  < step) {
      setHasPrevious(false)
    } else {
      setHasPrevious(true)
    }
    if(currentIndex + step >= totalAmount) {
      setHasNext(false)
    } else {
      setHasNext(true)
    }
  }, [currentIndex, totalAmount])

  const onClickPrevious = () => {
    onChangePagination(currentIndex - step)
  }

  const onClickNext = () => {
    onChangePagination(currentIndex + step)
  }

  return isVisible ? (
    <Pagination
      hasPrevious={hasPrevious}
      onPrevious={onClickPrevious}
      hasNext={hasNext}
      onNext={onClickNext}
    />
  ) : (<></>);
}
