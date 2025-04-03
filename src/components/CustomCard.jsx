import React from "react";
import { Card, Button } from "react-bootstrap";

const CustomCard = ({ title, text, imgSrc, buttonText, onButtonClick }) => {
  return (
    <Card style={{ width: "18rem" }}>
      {imgSrc && <Card.Img variant="top" src={imgSrc} alt={title} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        {buttonText && onButtonClick && (
          <Button variant="primary" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
