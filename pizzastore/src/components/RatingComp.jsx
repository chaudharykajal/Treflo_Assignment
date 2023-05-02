import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

export const Rating = ({ value, maxStars, starSize, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = Math.round(value - fullStars);
  const emptyStars = maxStars - fullStars - halfStars;
  //3.8
  //3
  //1
  //5-3-1

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} size={starSize} color={color} />
      ))}
      {[...Array(halfStars)].map((_, index) => (
        <FaStar key={`${index}-half`} half size={starSize} color={color} />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaStar key={`${index}-empty`} size={starSize} color="#e4e5e9" />
      ))}
    </div>
  );
};

Rating.defaultProps = {
  maxStars: 5,
  starSize: 24,
  color: '#ffc107',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  maxStars: PropTypes.number,
  starSize: PropTypes.number,
  color: PropTypes.string,
};

