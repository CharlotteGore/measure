var Measure = function(el){

  this.el = el;

  return this;

}

var IEStyles = {
  "padding-top" : "paddingTop",
  "padding-bottom" : "paddingBottom",
  "padding-left" : "paddingLeft",
  "padding-right" : "paddingRight",
  "border-top-width" : "borderTopWidth",
  "border-left-width" : "borderLeftWidth",
  "border-right-width" : "borderRightWidth",
  "border-bottom-width" : "borderBottomWidth",
  "margin-top" : "marginTop",
  "margin-left" : "marginLeft",
  "margin-right" : "marginRight",
  "margin-bottom" : "marginBottom"
};

var getStyle = function(property, e){

  var val;
  if(e.currentStyle){
    
    val = parseInt( ( e.currentStyle[ IEStyles[ property ] ] ).replace( 'px', '' ), 10 );
  
  }else if(window.getComputedStyle){

    val = parseInt( (document.defaultView.getComputedStyle( e, null ).getPropertyValue( property ) ).replace('px', '') ,10 );

  }

  return val;

};

var getBoxDetail = function(e){

  var padding={}, border={}, margin={};

  padding.top = getStyle("padding-top", e);
  padding.right = getStyle("padding-right", e);
  padding.bottom = getStyle("padding-bottom", e);
  padding.left = getStyle("padding-left", e);

  margin.top = getStyle("margin-top", e);
  margin.right = getStyle("margin-right", e);
  margin.bottom = getStyle("margin-bottom", e);
  margin.left = getStyle("margin-left", e);

  border.top = getStyle("border-top-width", e);
  border.right = getStyle("border-right-width", e);
  border.bottom = getStyle("border-bottom-width", e);
  border.left = getStyle("border-left-width", e);

  return{
    padding: padding,
    border: border,
    margin: margin
  }

};

Measure.prototype = {

  pagePosition : function(){

    var curleft = 0, curtop = 0, e = this.el;

        var m = this.boxDetails().margin;

    if (e.offsetParent) {
      do {
        curleft += e.offsetLeft;
        curtop += e.offsetTop;
      } while (e = e.offsetParent);

      curleft -= m.left;
      curtop -= m.top;

      return {x : curleft, y : curtop};
    }

  },

  innerPosition : function(){

    var m = this.boxDetails().margin;

    var xOffset = m.left;
    var yOffset = m.top;  

    var curleft = 0, curtop = 0;

    curleft += (el.offsetLeft - xOffset);
    curtop += (el.offsetTop - yOffset);

    return {x : curleft, y : curtop};

  },
  
  boxDetails : function(){

    return getBoxDetail( this.el );

  },

  innerSize : function(){

    var e = this.el;

    var boxDetails = getBoxDetail(e);

    var p = boxDetails.padding;
    var b = boxDetails.border;

    var xOffset = p.left + p.right + b.left + b.right;
    var yOffset = p.top + p.bottom + b.top + b.bottom;

    var x = 0, y = 0;
    x = (Math.max(el.clientWidth, el.offsetWidth)) - xOffset;
    y = (Math.max(el.clientHeight, el.offsetHeight)) - yOffset;
    return {x : x, y : y};

  },

  outerSize : function(){

    var x = 0, y = 0, e = this.el;

    x = Math.max(e.clientWidth, e.offsetWidth);
    y = Math.max(e.clientHeight, e.offsetHeight);

    return {x : x, y : y};

  },
  screenSize : function(){
 
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
 
    return { x : x, y : y}
 
  } 


};

module.exports = function(el){

  return new Measure(el);

};
