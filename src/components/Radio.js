import React from 'react';
import styled from 'styled-components';

const Radio = ({ options, selectedValue, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <StyledWrapper>
      <form className="container">
        {options.map((option, index) => (
          <React.Fragment key={option.value}>
            <input
              className="input-btn"
              type="radio"
              id={`valueIs-${index}`}
              name="valueIs-radio"
              value={option.value}
              onChange={handleChange}
              checked={selectedValue === option.value}
            />
            <label className="neon-btn" htmlFor={`valueIs-${index}`}>
              <span className="span" />
              <span className="txt">{option.label}</span>
            </label>
          </React.Fragment>
        ))}
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    margin-top: 5%;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-style: italic;
    font-weight: bold;
    display: flex; /* Change from grid to flex */
    place-content: center;
    width: 100%;
    justify-content: center; /* Center align buttons horizontally */
  }

  .container input[type=radio] {
    display: none;
  }

  .input-btn:is(:checked) + .neon-btn .span {
    inset: 2px;
    background-color: #4090b5;
    background: repeating-linear-gradient(to bottom, transparent 0%, #4090b5 1px, #4090b5 3px, #4090b5 5px, #4090b5 4px, transparent 0.5%), repeating-linear-gradient(to left, hsl(295, 60%, 12%) 100%, hsl(295, 60%, 12%) 100%);
    box-shadow: inset 0 40px 20px hsl(296, 59%, 10%);
  }

  .input-btn:is(:checked) + .neon-btn .txt {
    text-shadow: 2px 4px 1px #9e30a9, 2px 2px 1px #4090b5, 0 0 20px rgba(255, 255, 255, 0.616);
    color: rgb(255, 255, 255);
    animation: colorchange 0.3s ease;
  }

  .neon-btn {
    width: 50px;
    height: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center; /* Center the text within the button */
    background: transparent;
    position: relative;
    overflow: hidden;
    transition: all 2s ease-in-out;
    -webkit-clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
    clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
  }

  .neon-btn .span {
    display: flex;
    -webkit-clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
    clip-path: polygon(6% 0, 93% 0, 100% 8%, 100% 86%, 90% 89%, 88% 100%, 5% 100%, 0% 85%);
    position: absolute;
    inset: 1px;
    background-color: #212121;
    z-index: 1;
  }

  .neon-btn .txt {
    text-align: center;
    position: relative;
    z-index: 2;
    color: aliceblue;
    font-size: 1em;
    transition: all ease-in-out 2s linear;
    text-shadow: 0px 0px 1px #4090b5, 0px 0px 1px #9e30a9, 0 0 1px white;
  }

  .neon-btn::before {
    content: "";
    position: absolute;
    height: 300px;
    aspect-ratio: 1.5/1;
    box-shadow: -17px -19px 20px #9e30a9;
    background-image: conic-gradient(#9e30a9, transparent, transparent, transparent, transparent, transparent, transparent, #9e30a9);
    animation: rotate 4s linear infinite -2s;
  }

  .neon-btn::after {
    content: "";
    position: absolute;
    height: 300px;
    aspect-ratio: 1.5/1;
    box-shadow: -17px -19px 10px #4090b5;
    background-image: conic-gradient(#4090b5, transparent, transparent, transparent, transparent, transparent, transparent, transparent, #4090b5);
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes colorchange {
    0% {
      text-shadow: 0px 0px 0px #9e30a9, 0px 0px 0px #4090b5, 0 0 0px rgba(255, 255, 255, 0.616);
    }

    50% {
      text-shadow: -6px 5px 1px #9e30a9, 5px 11px 1px #4090b5, 0 0 20px rgba(255, 255, 255, 0.616);
    }

    to {
      text-shadow: 2px 4px 1px #9e30a9, 2px 2px 1px #4090b5, 0 0 20px rgba(255, 255, 255, 0.616);
    }
  }
`;

export default Radio;
