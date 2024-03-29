import { Component } from 'react';

class Carousel extends Component {
  state = {
    active: 0,
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    console.log(images);
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((image, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              src={image}
              alt="animal thumb"
              data-index={index}
              key={image}
              onClick={(e) =>
                this.setState({ active: +e.target.dataset.index })
              }
              className={index === active ? 'active' : ''}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
