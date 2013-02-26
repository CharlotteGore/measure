
# measure

  A module to measure elements. Cross browser. 

## Installation

    $ component install charlottegore/measure

## API

    var measurer = require('measure')( element );

### .pagePosition()

  The position of the element in the page

    var position = measurer.pagePosition();

  Returns an object with properties `x` and `y`

### .innerPosition()

  The position of the element relative to its offset parent.

    var position = measurer.innerPosition();

  Returns an object with properties `x` and `y`

### .boxDetails()

  The position of the element relative to its offset parent.

    var position = measurer.innerPosition();

  Returns an object with properties `border` and `margin` and `padding`. Each contains an object with the properties, `top`, `left`, `bottom` and `right`

### .innerSize()
 
  The size of the object, not including borders, margin or padding.

    var position = measurer.innerSize();

  Returns an object with properties `x` and `y` 

### .outerSize()
 
  The size of the object, including borders, margin or padding.

    var position = measurer.outerSize();

  Returns an object with properties `x` and `y` 

## License

  MIT
